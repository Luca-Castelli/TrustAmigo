import React, { useEffect, useState } from "react";

import AdminPanelReviewsRow from "./AdminPanelReviewsRow";
import AdminPanelContactRequestsRow from "./AdminPanelContactRequestsRow";

function AdminPanel() {
  const [pendingReviews, setPendingReviews] = useState([]);
  const [contactRequests, setContactRequests] = useState([]);
  const [reloadFlag, setReloadFlag] = useState(false);

  const getPendingReviews = async () => {
    try {
      const response = await fetch("/api/data/review/pending", {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setPendingReviews(data);
      } else {
        setPendingReviews([]);
      }
    } catch (error) {
      console.log(error);
      setPendingReviews([]);
    }
  };

  const getContactRequests = async () => {
    try {
      const response = await fetch("/api/data/contact", {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setContactRequests(data);
      } else {
        setContactRequests([]);
      }
    } catch (error) {
      console.log(error);
      setContactRequests([]);
    }
  };

  useEffect(() => {
    getPendingReviews();
    getContactRequests();
    setReloadFlag(false);
  }, [reloadFlag]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 text-center">
      <h1 className="font-bold text-left my-8">Admin Panel</h1>

      <h2 className="text-left mt-16 text-indigo-500 mb-4">Pending Reviews</h2>
      <table className="table w-full text-left">
        <thead className="text-sm text-slate-500">
          <tr>
            <th>Date</th>
            <th>Company</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Reviewed By</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {pendingReviews.map((item, key) => {
            return (
              <AdminPanelReviewsRow
                key={key}
                item={item}
                setReloadFlag={setReloadFlag}
              />
            );
          })}
        </tbody>
      </table>

      <h2 className="text-left mt-16 text-indigo-500 mb-4">Contact Requests</h2>
      <table className="table w-full text-left">
        <thead className="text-sm text-slate-500">
          <tr>
            <th>Created</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company Name</th>
            <th>Email Address</th>
            <th>Classification</th>
            <th>Last Updated</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {contactRequests.map((item, key) => {
            return (
              <AdminPanelContactRequestsRow
                key={key}
                item={item}
                setReloadFlag={setReloadFlag}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
