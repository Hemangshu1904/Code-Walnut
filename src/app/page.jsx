"use client";

import React, { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");

  const searchPokemon = async () => {
    setError("");
    setPokemon(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`,
      );
      if (!response.ok) throw new Error("Pokémon not found");
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError("Pokémon not found. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Poké Walnut</h1>
        <div className="search-container">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter Pokémon name or ID"
            className="search-input"
          />
          <button onClick={searchPokemon} className="search-button">
            Search
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
