import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";

import ProfileReviewsRow from "./ProfileReviewsRow";

function ProfileReviews() {
  const params = useParams();
  const companyName = params.name;

  const [reviews, setReviews] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getReviews = async () => {
    try {
      const response = await fetch("/api/data/review/" + companyName, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setReviews(data);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.log(error);
      setReviews([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getReviews();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-10 mt-8">
        {reviews.map((review) => (
          <ProfileReviewsRow key={review.id} item={review} />
        ))}
      </dl>
    </div>
  );
}

export default ProfileReviews;
