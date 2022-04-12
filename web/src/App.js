import { React, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import CategoryPage from "./pages/CategoryPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";

import { UseAuthStore } from "./utils/store";

function App() {
  const setCsrfToken = UseAuthStore((state) => state.setCsrfToken);

  const getCsrf = async () => {
    try {
      const response = await fetch("/api/auth/getCsrf", {
        method: "GET",
        credentials: "same-origin",
      });
      const data = response.headers.get(["X-CSRFToken"]);
      if (response.status === 200) {
        setCsrfToken(data);
      } else {
        setCsrfToken("");
      }
    } catch (error) {
      console.log(error);
      setCsrfToken("");
    }
  };

  useEffect(() => {
    getCsrf();
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route exact path="/search/:name" element={<SearchPage />}></Route>
        <Route exact path="/profile/:name" element={<ProfilePage />}></Route>
        <Route exact path="/category/:name" element={<CategoryPage />}></Route>
        <Route exact path="/contact" element={<ContactPage />}></Route>
        <Route exact path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
