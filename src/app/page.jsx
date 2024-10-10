"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchPokemon = async () => {
    if (!search.trim()) return;
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        searchPokemon();
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [search]);

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Pokédex</h1>
        <div className="search-container">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter Pokémon name or ID"
            className="search-input"
          />
          <button
            type="button"
            onClick={searchPokemon}
            disabled={loading}
            className="search-button"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {pokemon && (
          <div className="pokemon-card">
            <div className="pokemon-image-container">
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                className="pokemon-image"
              />
            </div>
            <h2 className="pokemon-name">{pokemon.name}</h2>
            <p className="pokemon-id">
              #{pokemon.id.toString().padStart(3, "0")}
            </p>
            <div className="types">
              {pokemon.types.map((type) => (
                <span key={type.type.name} className={`type ${type.type.name}`}>
                  {type.type.name}
                </span>
              ))}
            </div>
            <div className="stats">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="stat">
                  <span className="stat-name">{stat.stat.name}</span>
                  <div className="stat-bar-container">
                    <div
                      className="stat-bar"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    />
                  </div>
                  <span className="stat-value">{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
