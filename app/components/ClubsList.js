import listClubs from '../lib/clubsActions/listClubs.js';
import { addPullUp, getClubVote } from "../lib/clubsActions/pullActions/userPullActions.js";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeatherIcon from 'feather-icons-react';
import Club from './Club.js';
import { SearchBar } from './SearchBar.js';

export default function ClubsList() {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [pollClub, setPollClub] = useState({});

  async function fetchClubs() {
    const pollClub = await getClubVote();
    const clubs = await listClubs();

    setPollClub(pollClub.reduce((acc, vote) => {
      acc[vote.clubId] = (acc[vote.clubId] || 0) + vote.vote;
      return acc;
    }, {}));

    setClubs(clubs);
    setFilteredClubs(clubs);
  }

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <>
      <SearchBar clubs={clubs} setFilteredClubs={setFilteredClubs} />
      {filteredClubs.map((club) => (
        <Club 
          clubData={club} 
          pollClub={pollClub} 
          setPollClub={setPollClub} 
        />
      ))}
    </>
  )
}