"use client"

import Image from "next/image";
import { addPullUp, getClubVote } from "./lib/clubsActions/pullActions/userPullActions";
import listClubs from "./lib/clubsActions/listClubs";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeatherIcon from 'feather-icons-react';


export default function Home() {

  const [clubs, setClubs] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [pollClub, setPollClub] = useState({});
  const [disabledClubs, setDisabledClubs] = useState({});

  async function fetchClubs() {
    const pollClub = await getClubVote();
    const clubs = await listClubs();

    setPollClub(pollClub.reduce((acc, vote) => {
      acc[vote.clubId] = (acc[vote.clubId] || 0) + vote.vote;
      console.log("acc", acc);
      return acc;
    }, {}));
    
    setClubs(clubs);
  }

  console.log("pollClub", pollClub);

  const handleDisabledClubs = (idClub) => {

    // Deshabilitar el botón de pull down durante 5 segundos
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
    console.log("idClub", idClub);
    // Lógica para insertar en la base de datos el incremento
    await addPullUp(idClub);
    setPollClub(prevPollClub => ({
      ...prevPollClub,
      [idClub]: (prevPollClub[idClub] || 0) + 1,
    }));

    handleDisabledClubs(idClub);
  };

  const handlePullDown = (idClub) => {
    // Lógica para insertar en la base de datos el decremento

    setPollClub(prevPollClub => ({
      ...prevPollClub,
      [idClub]: (prevPollClub[idClub] || 0) - 1,
    }));

    //userPullAaction(idClub, "pullDown")
    handleDisabledClubs(idClub);
  }


  useEffect(() => {
    fetchClubs();
  }, []);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">NightLit  </h1>
      </div>

      {clubs.map((club) => {
        return (
          <div className="flex">
            <motion.div key={club.id} className="flex flex-col items-center justify-center w-64 h-64 p-8 m-4 bg-white rounded-lg shadow-lg dark:bg-neutral-800/100"
              onClick={() => setSelectedId(club.id)}
            >
              <motion.h5>{club.name}</motion.h5>
              <motion.h2>{club.website}</motion.h2>
            </motion.div>
            <div className="flex flex-col justify-center">
              <button 
                disabled={disabledClubs[club.id]} 
                onClick={() => handlePullUp(club.id)}
              >

                <FeatherIcon icon="arrow-up" className="W-3" />

              </button>
              <span className="m-2">
                {pollClub[club.id] || 0}
              </span>
              <button
                disabled={disabledClubs[club.id]}
                onClick={() => handlePullDown(club.id)}
              >
                <FeatherIcon icon="arrow-down" className="W-3" />
              </button>
            </div>
          </div>
        );
      })}

      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={selectedId}
            //animation popup
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-30"
          >
            <motion.h5>{clubs.find(club => club.id === selectedId).name}</motion.h5>
            <motion.h2>{clubs.find(club => club.id === selectedId).website}</motion.h2>
            <motion.button
              className="absolute top-4 right-4 m-4 p-4 text-white bg-black rounded-lg dark:bg-neutral-800/100 dark:text-neutral-100"
              onClick={() => setSelectedId(null)}>Close</motion.button>
          </motion.div>
        )}
      </AnimatePresence>


      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
