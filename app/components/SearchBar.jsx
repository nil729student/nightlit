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
    <div className="flex flex-col items-center justify-center w-full mb-8 pl-52 pr-52 md:flex-row">
      <input
        type="text"
        placeholder="Search Club"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 m-2 text-lg text-center border-2 text-black border-black rounded-lg md:w-3/5 md:text-2xl"
      />

      <Select
        className="w-full p-2 m-2 text-lg text-center border-2 text-black border-black rounded-lg md:w-2/5 md:text-2xl"
        options={optionsCity}
        onChange={(selectedOption) => setSearchTermCity(selectedOption ? selectedOption.value : "")}
        isSearchable
      />
    </div>
  );
}