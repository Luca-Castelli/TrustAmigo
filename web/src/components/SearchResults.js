import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import SearchResultsRow from "./SearchResultsRow";

function SearchResults() {
  const params = useParams();
  const searchTerm = params.name;

  const [searchResult, setSearchResult] = useState([]);

  const searchCommpany = async () => {
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
        setSearchResult(data);
      } else {
        setSearchResult([]);
      }
    } catch (error) {
      console.log(error);
      setSearchResult([]);
    }
  };

  useEffect(() => {
    searchCommpany();
  }, [searchTerm]);

  if (!searchTerm | (searchResult.length === 0)) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center">
        <div className="mt-8">
          Search returned no results. Click{" "}
          <Link to="/" className="text-indigo-500">
            here
          </Link>{" "}
          to return to Home.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 text-center">
      <table className="table w-full text-left">
        <thead className="font-bold">
          <tr>
            <th className="pl-2"></th>
            <th className="pl-2">Name</th>
            <th className="pl-2">Description</th>
            <th className="pl-2">Website</th>
            <th className="pl-2">Rating</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {searchResult.map((item, key) => {
            return <SearchResultsRow key={key} item={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SearchResults;
