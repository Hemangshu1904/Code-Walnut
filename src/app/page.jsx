"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterType, setFilterType] = useState("");

  const fetchPokemonList = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      );
      if (!response.ok) throw new Error("Error fetching Pokémon list");
      const data = await response.json();
      const detailedPokemonPromises = data.results.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json()),
      );
      const detailedPokemon = await Promise.all(detailedPokemonPromises);
      setPokemonList(detailedPokemon);
    } catch (err) {
      setError("Error fetching Pokémon data");
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonByName = async (name) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
      );
      if (!response.ok) throw new Error("Pokémon not found");
      const data = await response.json();
      setPokemonList([data]);
    } catch (err) {
      setError("Pokémon not found");
      setPokemonList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      fetchPokemonByName(search);
    } else {
      fetchPokemonList();
    }
  }, [offset, limit, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setOffset(0); // Reset pagination when searching
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilterType = (e) => {
    setFilterType(e.target.value);
  };

  const filteredAndSortedPokemon = () => {
    let filteredList = pokemonList;

    // Filter by type
    if (filterType) {
      filteredList = filteredList.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === filterType),
      );
    }

    // Sort by field
    filteredList.sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === "base_experience") {
        return sortOrder === "asc"
          ? a.base_experience - b.base_experience
          : b.base_experience - a.base_experience;
      }
      return 0;
    });

    return filteredList;
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      setOffset((prevOffset) => prevOffset - limit);
    }
  };

  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Pokédex</h1>

        {/* Search and Filter */}
        <div className="search-container">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by Pokémon name"
            className="search-input"
          />
          <select
            onChange={handleFilterType}
            value={filterType}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="bug">Bug</option>
            <option value="normal">Normal</option>
            <option value="poison">Poison</option>
            {/* Add more types as needed */}
          </select>
        </div>

        {/* Sort buttons */}
        <div className="sort-container">
          <button onClick={() => handleSort("name")}>Sort by Name</button>
          <button onClick={() => handleSort("base_experience")}>
            Sort by Experience
          </button>
        </div>

        {/* Pokémon List */}
        <div className="pokemon-list">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            filteredAndSortedPokemon().map((pokemon) => (
              <div key={pokemon.id} className="pokemon-card">
                <div className="pokemon-image-container">
                  <img
                    src={
                      pokemon.sprites.other["official-artwork"].front_default
                    }
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
                    <span
                      key={type.type.name}
                      className={`type ${type.type.name}`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
                <p>Base Experience: {pokemon.base_experience}</p>
                <div className="stats">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="stat">
                      <span className="stat-name">{stat.stat.name}</span>
                      <span className="stat-value">{stat.base_stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {!search && (
          <div className="pagination">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={offset === 0}
            >
              Previous
            </button>
            <button type="button" onClick={handleNextPage}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
