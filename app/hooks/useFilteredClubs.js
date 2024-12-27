"use client"
import { useState, useEffect } from "react";

export function useFilteredClubs(clubs) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermCity, setSearchTermCity] = useState("");
  const [filteredClubs, setFilteredClubs] = useState(clubs);

  useEffect(() => {
    const filtered = clubs.filter((club) => {
      const matchesName = club.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = searchTermCity ? club.addrCity === searchTermCity : true;
      return matchesName && matchesCity;
    });
    setFilteredClubs(filtered);
  }, [searchTerm, searchTermCity, clubs]);

  return {
    searchTerm,
    setSearchTerm,
    searchTermCity,
    setSearchTermCity,
    filteredClubs,
  };
}