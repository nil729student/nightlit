import {listClubs, listClubsByCity} from '../lib/clubsActions/listClubs.js';
import { addPullUp, getClubVote } from "../lib/clubsActions/pullActions/userPullActions.js";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeatherIcon from 'feather-icons-react';
import { SearchBar } from './SearchBar.jsx';
import Club from './Club.jsx';

export default function ClubsList() {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [pollClub, setPollClub] = useState({});

  async function fetchClubs() {
    const pollClub = await getClubVote();
    const clubs = await listClubsByCity();

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
      {filteredClubs.map((club, index) => (
        <Club
          key={index}
          clubData={club}
          pollClub={pollClub}
          setPollClub={setPollClub}
        />
      ))}
    </>
  )
}