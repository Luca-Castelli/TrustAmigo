import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";

import ProfileDetails from "./ProfileDetails";
import ProfileReviews from "./ProfileReviews";
import ReviewFormModal from "./ReviewFormModal";

function Profile() {
  const params = useParams();
  let companyName = params.name;
  const [company, setCompany] = useState({ avg_rating: 0 });
  const [showReviewFormModal, setShowReviewFormModal] = useState(false);

  const getCompanyProfile = async () => {
    try {
      const response = await fetch("/api/data/company/" + companyName, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setCompany(data);
        companyName = company.name;
      } else {
        setCompany([]);
      }
    } catch (error) {
      console.log(error);
      setCompany([]);
    }
  };

  useEffect(() => {
    getCompanyProfile();
  }, []);

  return (
    <div className="max-w-2xl mx-auto pt-24 pb-16 px-4 grid items-center grid-cols-1 gap-x-8">
      <div>
        <div className="flex">
          <img className="h-32 w-32" src={company.logo_url} />
          <div className="px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 py-2">
              {company.name}
            </h2>
            <Rating name="read-only" value={company.avg_rating} readOnly />
            <a href={company.website} className="block text-gray-500 ">
              {company.website}
            </a>
            <p className="text-gray-500">{company.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <ProfileDetails items={company} />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Have you used <span className="text-indigo-600">{company.name} </span>
          before?
        </h2>
        <button
          onClick={() => setShowReviewFormModal(true)}
          className="w-1/4 px-5 py-3 mt-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Write a Review!
        </button>
        <ProfileReviews items={company} />
      </div>
      <ReviewFormModal
        items={{ showReviewFormModal, setShowReviewFormModal, companyName }}
      />
    </div>
  );
}

export default Profile;
