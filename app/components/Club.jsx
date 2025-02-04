"use client"
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { addPullDown, addPullUp } from "../lib/clubsActions/pullActions/userPullActions.js";
import { motion, AnimatePresence } from "framer-motion";
import FeatherIcon from 'feather-icons-react';
import { generateDiscoMosaicBackground } from '../utils/ColorGenerator.js';
import './Club.css';
import { useRouter } from "next/navigation";
import ClubDetails from "./ClubDetails.jsx";
import { useSpring, useMotionValue } from "framer-motion";
import { useRef } from "react";

export default function Club({ clubData, pollClub, setPollClub }) {
    const { data: session } = useSession();
    const [selectedId, setSelectedId] = useState(null);
    const [disabledPullClubs, setDisabledPullClubs] = useState({});
    const router = useRouter();
    const cooldownPull = 5 * 60 * 1000; // 5 minuts
    const scale = useMotionValue(1);
    const springScale = useSpring(scale, { stiffness: 200, damping: 20 });
    const ref = useRef(null);

    // Nomes carregar la paguina es comprova si hi ha una sessió i si ha votat recentment
    useEffect(() => {
        if (!session || !session.user) return;
        // Deshabilita el botó de vot si ja ha votat recentment
        // Es verifica si ha votat recent ment per a deshabilitar el botó de vot
        const lastVoteTime = localStorage.getItem(`lastVoteTime-${session.user.id}-${clubData.id}`); // creem una variable per a guardar el temps de votació
        // Si ha votat recentment, deshabilita el botó de vot
        if (lastVoteTime) {
            // Calculo el temps que ha passat des de l'últim vot
            const tempsDesdeElUltimVot = Date.now() - new Date(lastVoteTime).getTime();
            // Si el temps que ha passat és menor que el cooldown, deshabilita el botó de vot
            if (tempsDesdeElUltimVot < cooldownPull) {
                // Deshabilita el botó de vot
                setDisabledPullClubs(prev => ({
                    ...prev,
                    [clubData.id]: true,
                }));
                // Després de 5 minuts, es torna a habilitar el botó de vot
                const timeout = setTimeout(() => { //
                    setDisabledPullClubs(prev => ({
                        ...prev,
                        [clubData.id]: false,
                    }));
                }, cooldownPull - tempsDesdeElUltimVot); // mirem quant falta per a poder votar
                return () => clearTimeout(timeout); // si no ha passat el temps, es cancela el temps
            }
        }
    }, [session, clubData.id]);
    // Nuevo efecto para el scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            // Calcular posición del elemento
            const rect = ref.current.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;

            // Calcular escala basada en proximidad al centro
            const distance = Math.abs(elementCenter - viewportCenter);
            const maxDistance = window.innerHeight / 2;
            const scaleValue = 1 + (1 - Math.min(distance / maxDistance, 1)) * 0.1;

            scale.set(scaleValue);
        };

        // Agregar listener con throttling
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const handleVote = async (idClub, voteType) => {
        if (!session || !session.user) {
            router.push("/login");
            return;
        }

        if (disabledPullClubs[idClub]) return; // No es pot votar si el botó està deshabilitat

        const currentVotes = pollClub[idClub] || 0;
        if (voteType === "down" && currentVotes === 0) return; // No es pot restar si les votacions són 0

        const voteAction = voteType === "up" ? addPullUp : addPullDown;
        const vote = await voteAction(idClub, session.user.id);

        if (vote) {
            setPollClub(prevPollClub => ({
                ...prevPollClub,
                [idClub]: voteType === "up"
                    ? currentVotes + 1
                    : Math.max(currentVotes - 1, 0),
            }));

            // Actualiza el temps de votació
            localStorage.setItem(`lastVoteTime-${session.user.id}-${idClub}`, new Date().toISOString());
            setDisabledPullClubs(prev => ({
                ...prev,
                [idClub]: true,
            }));

            setTimeout(() => {
                setDisabledPullClubs(prev => ({
                    ...prev,
                    [idClub]: false,
                }));
            }, cooldownPull);
        }
    };

    const mosaicStyle = {
        background: generateDiscoMosaicBackground().background,
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        margin: '16px',
    };

    return (
        <>
            <motion.div
            ref={ref}
            className="relative flex flex-col items-center p-6 rounded-lg shadow-lg text-white cursor-pointer"
            style={{ ...mosaicStyle, scale: springScale }}>
                <div className="flex">
                    <motion.div
                        key={clubData.id}
                        className="club-card flex flex-col items-center justify-center w-64 h-64 p-8 text-black rounded-lg shadow-lg overflow-auto"
                        onClick={() => setSelectedId(clubData.id)}
                    >
                        <motion.h5 className="text-center"><b>{clubData.name}</b></motion.h5>
                        <div className="flex flex-col items-center justify-center">
                            <motion.h2 className="text-center">{clubData.website}</motion.h2>
                        </div>
                        <motion.div>{clubData.addrCity}</motion.div>
                    </motion.div>
                    
                    <div className="flex flex-col bg-black h-1/2 ml-2 mt-20 rounded-full justify-center text-white">
                        
                        <button
                            onClick={() => handleVote(clubData.id, "up")}
                            disabled={disabledPullClubs[clubData.id]}
                        >
                            <FeatherIcon icon="arrow-up" className="w-6 h-6 transition-colors duration-200" />
                        </button>
                        
                        <span className="m-2">
                            {pollClub[clubData.id] || 0}
                        </span>
        
                        <button
                            onClick={() => handleVote(clubData.id, "down")}
                            disabled={disabledPullClubs[clubData.id] || (pollClub[clubData.id] || 0) === 0}
        
                        >
                            <FeatherIcon icon="arrow-down" className="w-6 h-6 transition-colors duration-200" />
                        </button>
        
                    </div>
                </div>
        
                {disabledPullClubs[clubData.id] && (
                    <p className="text-sm text-gray-500 mt-2">
                        You can vote again in 5 minutes.
                    </p>
                )}
            </motion.div>
            <AnimatePresence>
                {selectedId && selectedId === clubData.id && (
                    <ClubDetails
                        clubId={clubData.id}
                        onClose={() => setSelectedId(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
