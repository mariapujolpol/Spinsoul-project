import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage.jsx";
import ReleasesListPage from "./pages/ReleasesListPage.jsx";
import ReleaseDetailsPage from "./pages/ReleaseDetailsPage.jsx"; // si lo usas después
import ArtistsListPage from "./pages/ArtistsListPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleAddRecord() {
    // cuando tengas el form, cambia a: navigate("/releases/new")
    navigate("/releases");
  }

  return (
    <>
      <Navbar query={query} setQuery={setQuery} onAddRecord={handleAddRecord} />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/releases" element={<ReleasesListPage query={query} />} />

        <Route path="/artists" element={<ArtistsListPage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
