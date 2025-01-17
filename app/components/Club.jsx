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

export default function Club({ clubData, pollClub, setPollClub }) {
    const { data: session } = useSession();
    const [selectedId, setSelectedId] = useState(null);
    const [disabledPullClubs, setDisabledPullClubs] = useState({});
    const router = useRouter();
    const cooldownPull = 5 * 60 * 1000; // 5 minuts

    useEffect(() => {
        if (!session || !session.user) return;
        // Deshabilita el botó de vot si ja ha votat recentment
        // Es verifica si ha votat recent ment per a deshabilitar el botó de vot
        const lastVoteTime = localStorage.getItem(`lastVoteTime-${session.user.id}-${clubData.id}`);
        if (lastVoteTime) {
            const timeSinceLastVote = Date.now() - new Date(lastVoteTime).getTime();
            if (timeSinceLastVote < cooldownPull) {
                setDisabledPullClubs(prev => ({
                    ...prev,
                    [clubData.id]: true,
                }));
                const timeout = setTimeout(() => {
                    setDisabledPullClubs(prev => ({
                        ...prev,
                        [clubData.id]: false,
                    }));
                }, cooldownPull - timeSinceLastVote);
                return () => clearTimeout(timeout);
            }
        }
    }, [session, clubData.id]);

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
        background: generateDiscoMosaicBackground(),
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        margin: '16px',
    };

    return (
        <div className="club-container" style={mosaicStyle}>
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

            <AnimatePresence>
                {selectedId && selectedId === clubData.id && (
                    <ClubDetails
                        clubId={clubData.id}
                        onClose={() => setSelectedId(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
