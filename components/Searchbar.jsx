"use client";

import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import Link from "next/link";

function Searchbar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const debouncedKeyword = useDebounce(inputValue, 800);
  const [formData, setFormData] = React.useState({
    size: "10",
  });

  const setSearchValue = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // submitToApi(formData)
    console.log(formData);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!inputValue) return;

      const data = await fetch(
        `/api/data?searchInput=${inputValue}&size=${formData.size}`,
        {
          cache: "force-cache",
        }
      );

      if (data.status === 200) {
        const results = await data.json();
        onSearch(results);
      } else {
        onSearch("error");
      }
    };

    // call the function
    const result = fetchData().catch(console.error);
  }, [debouncedKeyword, formData]);

  return (
    <div className="nav-container">
      <Link href='/' className="home-link"> &larr; </Link>
      <div className="search-container">
        <input
          className="search"
          key="search-bar"
          placeholder={"Search "}
          onChange={setSearchValue}
        />
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className="legend">Search Size </div>
            <div className="checkboxes">
              <div>
                <input
                  type="radio"
                  id="size10"
                  name="size"
                  value="10"
                  checked={formData.size === "10"}
                  onChange={handleChange}
                />
                <label htmlFor="size">10</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="size50"
                  name="size"
                  value="50"
                  checked={formData.size === "50"}
                  onChange={handleChange}
                />
                <label htmlFor="size">50</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="size100"
                  name="size"
                  value="100"
                  checked={formData.size === "100"}
                  onChange={handleChange}
                />
                <label htmlFor="size">100</label>
              </div>
            </div>
          </fieldset>
          <button>Search</button>
        </form>
      </div>
    </div>
  );
}

// this is a search componenet
export default Searchbar;
