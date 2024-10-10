"use client";

import React, { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

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
          <button className="search-button">Search</button>
        </div>
      </div>
    </div>
  );
}
