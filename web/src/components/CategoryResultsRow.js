import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Rating } from "@mui/material";

function CategoryResultsRow({ item }) {
  const { name, description, website, logo_url } = item;
  const rating = 0;
  return (
    <tr className="border-t">
      <td className="h-16 w-16 align-middle">
        <img src={logo_url} />
      </td>
      <td className="p-2 text-indigo-500 font-bold">
        <Link to={`/profile/${name}`}>{name}</Link>
      </td>
      <td className="p-2">{description}</td>
      <td className="p-2">
        <a href={website}>{website}</a>
      </td>
      <td>
        <Rating name="read-only" value={rating} readOnly />
      </td>
    </tr>
  );
}

export default CategoryResultsRow;
