import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./ClubDetails.module.css";

export default function ClubDetails({ onClose }) {
  const [clubData, setClubData] = useState({
    id: "1",
    name: "Disco Night Club",
    website: "https://disconightclub.com",
    addrCity: "Barcelona",
    description: "El millor lloc per passar la nit.",
    bannerUrl: "/uploads/clubBaner/chill_11zon.jpg",
  });

  return (
    <motion.div
      layoutId={clubData.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-80"
    >
      <motion.div
        className={`relative flex flex-col md:flex-row items-stretch w-1/2 h-4/5 p-6 bg-black rounded-lg shadow-lg border-4 ${styles.container}`}
        style={{ borderRadius: "16px" }}
      >
        <div className="flex flex-col bg-gray- justify-between p-4 space-y-4 w-full md:w-1/2">
          <div>
            <h1 className="text-3xl font-bold">{clubData.name}</h1>
            <p className="mt-2 ">{clubData.description}</p>
            <a
              href={clubData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-blue-500 hover:underline"
            >
              {clubData.website}
            </a>
            <p className="mt-2">
              <strong>Ubicació:</strong> {clubData.addrCity}
            </p>
          </div>
        </div>

        <div
          className="flex-shrink-0 w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center rounded-r-lg"
          style={{ backgroundImage: `url(${clubData.bannerUrl})` }}
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
