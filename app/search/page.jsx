"use client";
import "./styles.css"
import React, { useState } from "react";
import { Inter } from "next/font/google";
import Searchbar from "../../components/Searchbar";
import Results from "../../components/Results";
import Link from "next/link";


function Search({ children }) {
  const [searchResults, setSearchResults] = useState("");

  const handleSearch = (value) => {
    // console.log("search handled:", value);
    setSearchResults(value); // Update search value from Searchbar
  };
  return (
    <div className="test">
      <div>
        <Searchbar onSearch={handleSearch} />
      </div>

      <Results searchResults={searchResults} />

    </div>


  );
}

export default Search;