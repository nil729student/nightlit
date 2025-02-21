"use client"
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { useFilteredClubs } from "../hooks/useFilteredClubs";
import { FaSearch } from "react-icons/fa";
const Select = dynamic(() => import('react-select'), { ssr: false }); // Importacio dinamica de react-select per evitar error al SSR

export function SearchBar({ clubs, setFilteredClubs }) {
  const {
    searchTerm,
    setSearchTerm,
    searchTermCity,
    setSearchTermCity,
    filteredClubs,
  } = useFilteredClubs(clubs);

  // Opcions de vusqueda per la ciutat
  const initialOptionsCity = [{ value: "", label: "All Cities" }];
  const [optionsCity, setOptionsCity] = useState(initialOptionsCity);
  const [selectedCity, setSelectedCity] = useState(initialOptionsCity[0]);

  useEffect(() => {
    const options = clubs.reduce((acc, club) => {
      if (club.addrCity && !acc.some(option => option.value === club.addrCity)) {
        acc.push({ value: club.addrCity, label: club.addrCity });
      }
      return acc;
    }, []);

    options.unshift({ value: "", label: "All Cities" });
    setOptionsCity(options);
  }, [clubs]);

  useEffect(() => {
    setFilteredClubs(filteredClubs);
  }, [filteredClubs, setFilteredClubs]);

  return (
    <div className="flex flex-col items-center justify-center w-full mb-8 px-4 md:px-20 ">
      {/* Search Input */}
      <div className="relative w-full md:w-3/4 mb-3">
        <input
          type="text"
          placeholder="Search Club"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 text-lg text-black rounded-lg shadow-lg focus:ring-4 focus:ring-purple-500 focus:outline-none"
          style={{ backgroundColor: "#fff", border: "2px solid #6f42c1" }}
        />
        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500" />
      </div>

      {/* City Select */}
      <Select
        className="w-full mt-4 md:w-2/5 md:mt-0 md:ml-4 text-black"
        options={optionsCity}
        value={selectedCity}
        onChange={(selectedOption) => {
          setSelectedCity(selectedOption);
          setSearchTermCity(selectedOption ? selectedOption.value : "");
        }}
        isSearchable
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#fff",
            borderColor: "#6f42c1",
            borderWidth: "2px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
      />
    </div>
  );
}
