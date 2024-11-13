import { useEffect, useState } from "react";
import { addPullUp } from "../lib/clubsActions/pullActions/userPullActions.js";
import { motion, AnimatePresence } from "framer-motion";
import FeatherIcon from 'feather-icons-react';
import { generateDiscoMosaicBackground } from '../utils/ColorGenerator.js'
import './Club.css';
import { Concert_One } from "next/font/google/index.js";

// Función para generar un color aleatorio
/*
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Función para generar un patrón de fondo único
const generateMosaicBackground = () => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    return `repeating-linear-gradient(
        45deg,
        ${color1},
        ${color1} 10px,
        ${color2} 10px,
        ${color2} 20px
    )`;
};
*/


export default function Club({ clubData, pollClub, setPollClub }) {
    const [selectedId, setSelectedId] = useState(null);
    const [disabledClubs, setDisabledClubs] = useState({});

    const handleDisabledClubs = (idClub) => {
        setDisabledClubs(prevDisabledClubs => ({
            ...prevDisabledClubs,
            [idClub]: true,
        }));

        setTimeout(() => {
            setDisabledClubs(prevDisabledClubs => ({
                ...prevDisabledClubs,
                [idClub]: false,
            }));
        }, 5000);
    }

    const handlePullUp = async (idClub) => {
        await addPullUp(idClub);
        setPollClub(prevPollClub => ({
            ...prevPollClub,
            [idClub]: (prevPollClub[idClub] || 0) + 1,
        }));

        handleDisabledClubs(idClub);
    };

    const handlePullDown = (idClub) => {
        setPollClub(prevPollClub => ({
            ...prevPollClub,
            [idClub]: (prevPollClub[idClub] || 0) - 1,
        }));

        handleDisabledClubs(idClub);
    }

    // Generar un estilo único para cada club
    const mosaicStyle = {
        background: generateDiscoMosaicBackground(),
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        margin: '16px',
    };

    return (
        <div className="club-container" style={mosaicStyle}>
            <div className="flex ">
                <motion.div
                    key={clubData.id}
                    className="club-card flex flex-col items-center justify-center w-64 h-64 p-8 text-black rounded-lg shadow-lg overflow-auto"
                    onClick={() => setSelectedId(clubData.id)}
                >
                    <motion.h5 className="text-center"><b>{clubData.name}</b></motion.h5>
                    <div className="flex flex-col items-center justify-center">
                        <motion.h2 className="text-center">{clubData.website}</motion.h2>
                    </div>
                    <motion.div
                            className=""
                    >{clubData.addrCity}</motion.div>
                </motion.div>
                <div className="flex flex-col bg-black h-1/2 ml-2 mt-20 rounded-full  justify-center">
                    <button
                        disabled={disabledClubs[clubData.id]}
                        onClick={() => handlePullUp(clubData.id)}
                    >
                        <FeatherIcon icon="arrow-up" className="w-6 h-6 transition-colors duration-200" />
                    </button>
                    <span className="m-2">
                        {pollClub[clubData.id] || 0}
                    </span>
                    <button
                        disabled={disabledClubs[clubData.id]}
                        onClick={() => handlePullDown(clubData.id)}
                    >
                        <FeatherIcon icon="arrow-down" className="W-3" />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {selectedId && selectedId === clubData.id && (
                    <motion.div
                        layoutId={selectedId}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-30"
                    >
                        <motion.h5>{clubData.name}</motion.h5>
                        <motion.h2>{clubData.website}</motion.h2>
                        <motion.button
                            className="absolute top-4 right-4 m-4 p-4 text-white bg-black rounded-lg dark:bg-neutral-800/100 dark:text-neutral-100"
                            onClick={() => setSelectedId(null)}
                        >
                            Close
                        </motion.button>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
