import React, { useState, useEffect } from "react";
import Select from 'react-select';
export function SearchBar({ clubs, setFilteredClubs }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermCity, setSearchTermCity] = useState("");

  // Opcions de busqueda per a la ciutat
  const optionsCity = clubs.reduce((acc, club) => {
    if (club.addrCity !== null && !acc.some(option => option.value === club.addrCity)) {
      acc.push({ value: club.addrCity, label: club.addrCity });
    }
    return acc;
  }, []);

  useEffect(() => {
    const filteredClubs = clubs.filter((club) => {
      return club.name.toLowerCase().includes(searchTerm.toLowerCase() );
    });
    setFilteredClubs(filteredClubs);
  }, [searchTerm, clubs, setFilteredClubs, searchTermCity]);

  return (
    <div className="flex items-center justify-center w-full mb-8">
      <input
        type="text"
        placeholder="Search Club"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/3 p-2 m-4 text-2xl text-center border-2 text-black border-black rounded-lg" 
      />

      <Select
        className="p-2 m-4 text-2xl text-center border-2 text-black border-black rounded-lg"
        options={optionsCity}
        onChange={(selectedOption) => setSearchTermCity(selectedOption.value)}
        isSearchable
      />

    </div>
  );
}