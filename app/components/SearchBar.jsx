import React, { useEffect } from "react";
import Select from 'react-select';
import { useFilteredClubs } from "../hooks/useFilteredClubs";

export function SearchBar({ clubs, setFilteredClubs }) {
  const {
    searchTerm,
    setSearchTerm,
    searchTermCity,
    setSearchTermCity,
    filteredClubs,
  } = useFilteredClubs(clubs);

  // Opcions de busqueda per a la ciutat del club
  const optionsCity = clubs.reduce((acc, club) => {
    if (club.addrCity !== null && !acc.some(option => option.value === club.addrCity)) {
      acc.push({ value: club.addrCity, label: club.addrCity });
    }
    return acc;
  }, []);

  optionsCity.unshift({ value: "", label: "All Cities" });

  useEffect(() => {
    setFilteredClubs(filteredClubs);
  }, [filteredClubs, setFilteredClubs]);

  return (
    <div className="flex items-center justify-center w-full mb-8">
      <input
        type="text"
        placeholder="Search Club"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/3 p-2 m-4 text-2xl text-center border-2 text-black border-black rounded-lg"
      />

      <Select
        className="p-2 m-4 text-2xl text-center border-2 text-black border-black rounded-lg"
        options={optionsCity}
        onChange={(selectedOption) => setSearchTermCity(selectedOption ? selectedOption.value : "")}
        isSearchable
      />
    </div>
  );
}