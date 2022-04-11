import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/outline";
import { Rating } from "@mui/material";

function ProfileReviewsRow({ item }) {
  const {
    id,
    reviewer_name,
    rating,
    reviewer_title,
    reviewer_company,
    date,
    description,
  } = item;

  return (
    <div key={id} className="border-t border-gray-200 pt-4">
      <dt className="font-medium text-gray-900">
        <div className="flex">
          {reviewer_name}
          <div className="px-2">
            <Rating name="read-only" value={rating} readOnly size="small" />
          </div>
          <div className="flex text-xs w-1/4 h-4 text-slate-500 ">
            Verified <CheckIcon />
          </div>
        </div>
      </dt>
      <p className="text-sm text-gray-300">
        {reviewer_title} at {reviewer_company}
      </p>
      <p className="text-sm text-gray-300">{date.substring(0, 16)}</p>
      <dd className="mt-2 text-sm text-gray-500">{description}</dd>
    </div>
  );
}

export default ProfileReviewsRow;
