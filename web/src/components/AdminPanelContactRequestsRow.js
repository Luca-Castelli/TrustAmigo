import { React, useState } from "react";

import { UseAuthStore } from "../utils/store";

function AdminPanelContactRequestsRow({ item, setReloadFlag }) {
  const csrfToken = UseAuthStore((state) => state.csrfToken);
  const [newStatus, setNewStatus] = useState("");

  const {
    id,
    created_date,
    last_updated_date,
    first_name,
    last_name,
    company_name,
    email,
    classification,
    status,
  } = item;

  const updateStatus = async () => {
    const payload = {
      contact_request_id: id,
      new_status: newStatus,
    };
    try {
      const response = await fetch("/api/data/contact/update", {
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
        console.log("Update failed.");
      } else {
        console.log("Update successful.");
      }
    } catch (error) {
      console.log(error);
    }
    setReloadFlag(true);
  };

  const deleteContactRequest = async () => {
    const payload = {
      contact_request_id: id,
    };
    try {
      const response = await fetch("/api/data/contact/delete", {
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
        console.log("Update failed.");
      } else {
        console.log("Update successful.");
      }
    } catch (error) {
      console.log(error);
    }
    setReloadFlag(true);
  };

  return (
    <tr className="border-t">
      <td className="p-2">{created_date}</td>
      <td className="p-2">{first_name}</td>
      <td className="p-2">{last_name}</td>
      <td className="p-2">{company_name}</td>
      <td className="p-2">{email}</td>
      <td className="p-2">{classification}</td>
      <td className="p-2">{last_updated_date}</td>
      <td className="p-2">{status}</td>
      <td>
        <select onChange={(e) => setNewStatus(e.target.value)}>
          <option>New</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button
          onClick={updateStatus}
          className="bg-indigo-500 text-white rounded-md p-1 ml-2"
        >
          Update Status
        </button>
        <button
          onClick={deleteContactRequest}
          className="bg-red-500 text-white rounded-md p-1 ml-2"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default AdminPanelContactRequestsRow;
