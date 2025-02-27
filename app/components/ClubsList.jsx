"use client"
import { listClubs, listClubsByCityPullOrder } from '../lib/clubsActions/listClubs.js';
import { addPullUp, getClubVote } from "../lib/clubsActions/pullActions/userPullActions.js";
import { useEffect, useState } from "react";
import { SearchBar } from './SearchBar.jsx';
import Club from './Club.jsx';
import { usePathname } from "next/navigation";
import { init, cleanup } from "../animation/fonsStars/script.js";

export default function ClubsList() {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [pollClub, setPollClub] = useState({});

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      init();
    }
    return () => {
      cleanup();
    };
  }, [pathname]);

  async function fetchClubs() {
    const pollClub = await getClubVote();
    const clubs = await listClubsByCityPullOrder();

    setPollClub(pollClub.reduce((acc, vote) => {
      console.log(vote);
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
      {pathname === "/" && <div className="stars-container"></div>}
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