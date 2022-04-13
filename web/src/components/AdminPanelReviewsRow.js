import React from "react";

import { UseAuthStore } from "../utils/store";

function AdminPanelReviewsRow({ item, setReloadFlag }) {
  const csrfToken = UseAuthStore((state) => state.csrfToken);

  const {
    id,
    date,
    reviewed_company,
    rating,
    description,
    reviewer_company,
    reviewer_title,
    reviewer_name,
  } = item;

  const approveReview = async () => {
    const payload = {
      review_id: id,
    };
    try {
      const response = await fetch("/api/data/review/approve", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.status !== 200) {
        console.log("Approve failed.");
      } else {
        console.log("Approve successful.");
      }
    } catch (error) {
      console.log(error);
    }
    setReloadFlag(true);
  };

  const deleteReview = async () => {
    const payload = {
      review_id: id,
    };
    try {
      const response = await fetch("/api/data/review/delete", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.status !== 200) {
        console.log("Delete failed.");
      } else {
        console.log("Delete successful.");
      }
    } catch (error) {
      console.log(error);
    }
    setReloadFlag(true);
  };

  return (
    <tr className="border-t">
      <td className="p-2">{date}</td>
      <td className="p-2">{reviewed_company}</td>
      <td className="p-2">{rating}</td>
      <td className="p-2">{description}</td>
      <td className="p-2">{reviewer_name}</td>
      <td>
        <button
          onClick={() => approveReview()}
          className="bg-green-500 text-white rounded-md p-1 w-20"
        >
          Approve
        </button>
        <button
          onClick={() => deleteReview()}
          className="bg-red-500 text-white rounded-md p-1 ml-2 w-20"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default AdminPanelReviewsRow;
