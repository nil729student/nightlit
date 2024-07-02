import React, { useState, useEffect } from "react";

export function SearchBar({ clubs, setFilteredClubs }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredClubs = clubs.filter((club) => {
      return club.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredClubs(filteredClubs);
  }, [searchTerm, clubs, setFilteredClubs]);

  return (
    <div className="flex items-center justify-center w-full mb-8">
      <input
        type="text"
        placeholder="Search Club"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/3 p-2 m-4 text-2xl text-center border-2 text-black border-black rounded-lg"
      />
    </div>
  );
}