"use client"
import styles from "./ClubDetails.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getClubData } from "../lib/clubsActions/clubActions";
import { getSongs } from "../lib/clubsActions/songActions";
import Image from 'next/image';
import FeatherIcon from 'feather-icons-react';

export default function ClubDetails({ clubId, onClose }) {
  const [clubData, setClubData] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const [songsData, setSongsData] = useState({
    data: [],
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    setClubData({ data: null, loading: true, error: null });
    try {
      const data = await getClubData(clubId);
      setClubData({ data, loading: false, error: null });
    } catch {
      setClubData({ data: null, loading: false, error: "Error carregant dades." });
    }
  };

  const fetchSongs = async () => {
    setSongsData({ data: [], loading: true, error: null });
    try {
      const data = await getSongs(clubId);
      setSongsData({ data, loading: false, error: null });
    } catch {
      setSongsData({ data: [], loading: false, error: "Error carregant cançons." });
    }
  };

  useEffect(() => {
    fetchData();
    fetchSongs();
  }, [clubId]);

  const { data, loading, error } = clubData;

  if (loading) {
    return (
      <motion.div
        className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-white">Carregant dades...</div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-red-500">{error}</div>
      </motion.div>
    );
  }

  if (!data) {
    return null; // Si no hi ha dades disponibles, no es renderitza res.
  }

  return (
    <motion.div
      layoutId={data.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80"
    >
      <motion.div
        className={`relative flex flex-col md:flex-row items-stretch w-11/12 max-w-4xl h-4/5 p-6 bg-black rounded-lg shadow-lg border-4 ${styles.container}`}
        style={{ borderRadius: "16px" }}
      >
        <div className="flex flex-col justify-between p-4 space-y-4 w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-white">{data.name}</h1>
          <a
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-blue-400 hover:underline"
          >
            {data.website}
          </a>
          <p className="mt-2 text-gray-300">{data.information}</p>

          <p className="mt-2 text-gray-300">
            <strong>Ciutat:</strong> {data.addrCity}
          </p>
          <p className="mt-2 text-gray-300">
            <strong>Adreça:</strong> {data.addrStreet}, {data.addrHouseNumber}, {data.addrpostcode}
          </p>
          <span className="flex flex-row mt-3 space-x-4">
            {data.instagram && (
              <a href={`https://www.instagram.com/${data.instagram}`}>
                <FeatherIcon icon="instagram" className="" />
              </a>
            )}
            {data.facebook && (
              <a href={`https://www.facebook.com/${data.facebook}`}>
                <FeatherIcon icon="facebook" className="" />
              </a>
            )}
            {data.twitter && (
              <a href={`https://www.x.com/${data.twitter}`}>
                <Image src="/x.png" alt="club" width={22} height={22} className="mt-0.5" />
              </a>
            )}
          </span>
          {/* Mostrar la playlist */}
          <div className="flex flex-col items-center h-60 p-4">
            {songsData.data.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-4">Playlist</h2>
                <div className="space-y-2 h-auto overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-black overflow-y-scroll">
                  <ul className="mx-4">
                    {songsData.data.map((song) => (
                      <li key={song.id}>
                        <a
                          href={song.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {song.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </>

            )}
          </div>
        </div>

        <div
          className="flex-shrink-0 w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center rounded-r-lg"
          style={{ backgroundImage: `url(${data.banner})` }}
        />

        <motion.button
          className="absolute top-2 right-2 p-2 text-white bg-black rounded-full hover:bg-gray-800"
          onClick={onClose}
        >
          ✕
        </motion.button>
      </motion.div>
    </motion.div>
  );
}