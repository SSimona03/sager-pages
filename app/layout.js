"use client";
import "../dist/styles/globals.css";
import React, { useState } from "react";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

//the layout on how the pages will be arraned

export default function RootLayout({ children }) {

  const handleSearch = (value) => {

    setSearchResults(value); // Update search value from Searchbar
  };
  return (
    <html lang="en">
      <body>
        <div>

        </div>

        <div className={inter.className}>{children}</div>
      </body>
    </html>
  );
}
