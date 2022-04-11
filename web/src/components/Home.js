import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineTrophy } from "react-icons/ai";
import { IoTrendingUpOutline } from "react-icons/io5";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  let navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span className="block">Where you go for software.</span>
      </h2>
      <h3 className="block py-2">
        Your spot for over <span className="text-indigo-600">1,500,000</span>{" "}
        real user reviews.
      </h3>
      <div className="mt-8 flex justify-center">
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter the product name..."
          className="w-1/3 p-2 rounded-l-lg border text-sm"
        />
        <button
          onClick={handleSearch}
          className="shadow inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-r-lg text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Search
        </button>
      </div>
      <div className="flex text-sm text-slate-500 items-center justify-center">
        <button className="flex items-center p-2">
          <AiOutlineTrophy />
          <p className="px-1"> Best Products</p>
        </button>
        <button className="flex items-center p-2">
          <IoTrendingUpOutline />
          <p className="px-1"> Trending Products</p>
        </button>
      </div>
    </div>
  );
}

export default Home;
