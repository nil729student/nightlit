"use client"
import styles from "./ClubDetails.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getClubData } from "../lib/clubsActions/clubActions";
import { getSongs } from "../lib/clubsActions/songActions";
import Link from "next/link";
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
        className={`relative flex flex-col md:flex-row items-stretch w-11/12 max-w-6xl max-h-[90vh] p-6 bg-black rounded-lg shadow-xl border-2 border-gray-800 overflow-auto
    ${styles.container}`}
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

          {data.phone && (
            <span className="flex flex-row mt-3 space-x-4 text-white ">
              <FeatherIcon icon="phone" className="w-4 h-4 mr-2" />
              {data.phone}
            </span>
          )}

          <div className="rounded-lg shadow ">
            {data.region && (
              <span className=" font-semibold text-white">{data.region}</span>
            )}
            {data.region && data.addrCity && (
              <span className="mx-2 text-gray-500">|</span>
            )}
            {data.addrCity && (
              <span className=" font-semibold text-white">{data.addrCity}</span>
            )}
            <div className="mt-3">
              <p className="text-sm text-gray-300 ">
                {data.addrStreet}, {data.addrHouseNumber}, {data.addrpostcode}
              </p>
            </div>
          </div>
          <span className="flex flex-row mt-3 space-x-4">
            {data.instagram && (
              <a href={`https://www.instagram.com/${data.instagram}`} target="_blank" rel="noopener noreferrer">
                <FeatherIcon icon="instagram" className="text-white" />
              </a>
            )}
            {data.facebook && (
              <a href={`https://www.facebook.com/${data.facebook}`} target="_blank" rel="noopener noreferrer">
                <FeatherIcon icon="facebook" className="text-white" />
              </a>
            )}
            {data.twitter && (
              <a href={`https://www.x.com/${data.twitter}`} target="_blank" rel="noopener noreferrer">
                <Image src="/x.png" alt="club" width={22} height={22} className="mt-0.5" />
              </a>
            )}
          </span>
          {/* Mostrar la playlist  space-y-2 h-auto overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-black overflow-y-scroll*/}
          <div className="flex flex-col h-60 p-4 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800">
            {songsData.data.length > 0 && (
              <>
                <div className="flex items-center mb-4">
                  <FeatherIcon icon="music" className="w-6 h-6 mr-3 text-purple-400" />
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    Playlist
                  </h2>
                </div>
                <div className="flex-1 overflow-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-black overflow-y-scroll">
                  <ul className="space-y-3">
                    {songsData.data.map((song) => (
                      <li
                        key={song.id}
                        className="group flex items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                      >
                        <a
                          href={song.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-300 group-hover:text-white transition-colors truncate"
                        >
                          <FeatherIcon
                            icon="play"
                            className="w-4 h-4 mr-3 text-gray-400 group-hover:text-purple-400 transition-colors"
                          />
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
        {/* Imatge de la banda */}
        {/*
        <div
          className="flex-shrink-0 w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center rounded-r-lg"
          style={{ backgroundImage: `url(${data.banner})` }}
        />
        */}
        <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-auto bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-800">
          <div className="absolute inset-0 overflow-y-auto">
            <Image

              src={data.banner ? data.banner : "/club.jpg"}
              alt={data.name}
              layout="fill"
              objectFit="cover"
              className="w-full h-auto"
            />
          </div>
        </div>

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