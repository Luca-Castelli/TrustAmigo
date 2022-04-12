import React from "react";

import { UseAuthStore } from "../utils/store";

function AdminPanelContactRequestsRow({ item, setReloadFlag }) {
  const csrfToken = UseAuthStore((state) => state.csrfToken);

  const {
    id,
    date,
    first_name,
    last_name,
    company_name,
    email,
    classification,
    status,
  } = item;

  //   const approveReview = async () => {
  //     const payload = {
  //       review_id: id,
  //     };
  //     try {
  //       const response = await fetch("/api/data/review/approve", {
  //         method: "POST",
  //         credentials: "same-origin",
  //         headers: {
  //           "content-type": "application/json",
  //           "X-CSRFToken": csrfToken,
  //         },
  //         body: JSON.stringify(payload),
  //       });
  //       const data = await response.json();
  //       if (response.status !== 200) {
  //         console.log("Approve failed.");
  //       } else {
  //         console.log("Approve successful.");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setReloadFlag(true);
  //   };

  return (
    <tr className="border-t">
      <td className="p-2">{date}</td>
      <td className="p-2">{first_name}</td>
      <td className="p-2">{last_name}</td>
      <td className="p-2">{company_name}</td>
      <td className="p-2">{email}</td>
      <td className="p-2">{classification}</td>
      <td className="p-2">{status}</td>
      <td>
        <button className="bg-green-500 rounded-md p-1 w-20">Approve</button>
        <button className="bg-red-500 rounded-md p-1 ml-2 w-20">Delete</button>
      </td>
    </tr>
  );
}

export default AdminPanelContactRequestsRow;
