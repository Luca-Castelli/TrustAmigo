import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeBanner from "../assets/HomeBanner.png";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch("/api/data/company/search/" + searchTerm, {
          method: "GET",
          credentials: "same-origin",
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.log(error);
        setSearchResults([]);
      }
    }
    if (searchTerm) {
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  function handleFocus() {
    setShowDropdown(true);
  }

  function handleBlur() {
    setShowDropdown(false);
  }

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <img src={HomeBanner} className="mb-12" />
        <span className="block">Where you go for software.</span>
      </h2>
      <h3 className="block py-2">
        Your spot for over <span className="text-indigo-600">1,500,000</span>{" "}
        real user reviews.
      </h3>

      <form onSubmit={handleSearch} className="mt-8 flex justify-center">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full py-2 px-3 bg-gray-200 rounded-md text-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          />
          <div
            className={`${
              showDropdown ? "block" : "hidden"
            } absolute w-full rounded-md shadow-lg`}
          >
            <ul className="w-full list-none px-2 py-2">
              {searchResults.map((result) => (
                <li key={result.id} className="px-2 py-2">
                  {result.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          type="submit"
          className="shadow inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-r-lg text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Search
        </button>
      </form>
      {/* <div className="flex text-sm text-slate-500 items-center justify-center">
        <button className="flex items-center p-2">
          <AiOutlineTrophy />
          <p className="px-1"> Best Products</p>
        </button>
        <button className="flex items-center p-2">
          <IoTrendingUpOutline />
          <p className="px-1"> Trending Products</p>
        </button>
      </div> */}
    </div>
  );
}

export default Home;
