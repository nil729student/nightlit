import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/navigation";
import { generateDiscoMosaicBackground } from "../utils/ColorGenerator.js";
import ClubDetails from "./ClubDetails.jsx";

export default function Club({ clubData, pollClub, setPollClub }) {
    const { data: session } = useSession();
    const [selectedId, setSelectedId] = useState(null);
    const [disabledPullClubs, setDisabledPullClubs] = useState({});
    const router = useRouter();
    const cooldownPull = 5 * 60 * 1000;

    useEffect(() => {
        if (!session || !session.user) return;
        const lastVoteTime = localStorage.getItem(`lastVoteTime-${session.user.id}-${clubData.id}`);
        if (lastVoteTime) {
            const timeElapsed = Date.now() - new Date(lastVoteTime).getTime();
            if (timeElapsed < cooldownPull) {
                setDisabledPullClubs(prev => ({ ...prev, [clubData.id]: true }));
                const timeout = setTimeout(() => {
                    setDisabledPullClubs(prev => ({ ...prev, [clubData.id]: false }));
                }, cooldownPull - timeElapsed);
                return () => clearTimeout(timeout);
            }
        }
    }, [session, clubData.id]);

    const handleVote = async (idClub, voteType) => {
        if (!session || !session.user) {
            router.push("/login");
            return;
        }
        if (disabledPullClubs[idClub]) return;

        const currentVotes = pollClub[idClub] || 0;
        if (voteType === "down" && currentVotes === 0) return;

        const newVotes = voteType === "up" ? currentVotes + 1 : Math.max(currentVotes - 1, 0);
        setPollClub(prev => ({ ...prev, [idClub]: newVotes }));
        localStorage.setItem(`lastVoteTime-${session.user.id}-${idClub}`, new Date().toISOString());
        setDisabledPullClubs(prev => ({ ...prev, [idClub]: true }));

        setTimeout(() => {
            setDisabledPullClubs(prev => ({ ...prev, [idClub]: false }));
        }, cooldownPull);
    };

    return (
        <motion.div 
            className="relative flex flex-col items-center p-6 rounded-lg shadow-lg text-white cursor-pointer"
            style={generateDiscoMosaicBackground()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedId(clubData.id)}
        >
            <motion.h2 className="text-2xl font-bold text-center">{clubData.name}</motion.h2>
            <p className="text-sm text-center opacity-80">{clubData.addrCity}</p>
            <a 
                href={clubData.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 mt-2 transition-colors"
            >
                Visitar sitio web
            </a>
            <div className="flex items-center mt-4 space-x-4">
                <button
                    onClick={(e) => { e.stopPropagation(); handleVote(clubData.id, "up"); }}
                    disabled={disabledPullClubs[clubData.id]}
                >
                    <FeatherIcon icon="arrow-up" className="w-6 h-6 transition-transform duration-200 hover:scale-110" />
                </button>
                <span className="text-lg font-bold">{pollClub[clubData.id] || 0}</span>
                <button
                    onClick={(e) => { e.stopPropagation(); handleVote(clubData.id, "down"); }}
                    disabled={disabledPullClubs[clubData.id] || (pollClub[clubData.id] || 0) === 0}
                >
                    <FeatherIcon icon="arrow-down" className="w-6 h-6 transition-transform duration-200 hover:scale-110" />
                </button>
            </div>
            {disabledPullClubs[clubData.id] && (
                <p className="text-xs text-gray-400 mt-2">Podrás votar de nuevo en 5 minutos.</p>
            )}
            <AnimatePresence>
                {selectedId && selectedId === clubData.id && (
                    <ClubDetails clubId={clubData.id} onClose={() => setSelectedId(null)} />
                )}
            </AnimatePresence>
        </motion.div>
    );
}
