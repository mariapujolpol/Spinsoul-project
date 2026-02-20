// App.jsx is the "root" of your React application.
// It defines:
// 1) Global UI (Navbar + Footer)
// 2) Routing (which page renders for each URL)
// 3) Shared state that multiple pages need (the search query)

import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage.jsx";
import ReleasesListPage from "./pages/ReleasesListPage.jsx";
import ReleaseDetailsPage from "./pages/ReleaseDetailsPage.jsx";
import ArtistsListPage from "./pages/ArtistsListPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Footer from "./components/Footer";
import AddRecordPage from "./pages/AddRecordPage.jsx";
import ArtistDetailsPage from "./pages/ArtistDetailsPage.jsx";
import ImportDiscogsPage from "./pages/ImportDiscogsPage";

export default function App() {

  // ------------------------------------------------------------
  // SHARED SEARCH STATE (global-ish)
  // This state lives here because multiple pages need it:
  // - HomePage
  // - ReleasesListPage
  // - ArtistsListPage
  //
  // Navbar updates it, pages consume it.
  // ------------------------------------------------------------
  const [query, setQuery] = useState("");

  // React Router navigation hook
  const navigate = useNavigate();


  // ------------------------------------------------------------
  // "Add Record" ACTION
  // Navbar triggers this via the onAddRecord prop
  // The actual navigation happens here in App
  // ------------------------------------------------------------
  function handleAddRecord() {
    // Navigate to the create record form
    navigate("/releases/new");
  }


  return (
    <>
      {/* ------------------------------------------------------------
          TOP LAYOUT: NAVBAR
          - Receives query and setQuery so it can control SearchBar
          - Receives onAddRecord to trigger navigation
      ------------------------------------------------------------ */}
      <Navbar
        query={query}
        setQuery={setQuery}
        onAddRecord={handleAddRecord}
      />

      {/* ------------------------------------------------------------
          ROUTES: each URL renders a page component
          Notes:
          - Pages that need the search query receive it as a prop
          - Details pages use URL params (artistId / releaseId)
      ------------------------------------------------------------ */}
      <Routes>

        {/* Home uses query for filtering suggestions */}
        <Route path="/" element={<HomePage query={query} />} />

        {/* List pages use query for filtering */}
        <Route path="/releases" element={<ReleasesListPage query={query} />} />
        <Route path="/artists" element={<ArtistsListPage query={query} />} />

        {/* Artist details page reads artistId from the URL */}
        <Route path="/artists/:artistId" element={<ArtistDetailsPage />} />

        {/* Static pages */}
        <Route path="/about" element={<AboutPage />} />

        {/* Release details page reads releaseId from the URL */}
        <Route path="/releases/:releaseId" element={<ReleaseDetailsPage />} />

        {/* Discogs import flow (search + pick a release) */}
        <Route path="/releases/import" element={<ImportDiscogsPage />} />

        {/* Create new release form (also used as the prefill destination) */}
        <Route path="/releases/new" element={<AddRecordPage />} />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* ------------------------------------------------------------
          BOTTOM LAYOUT: FOOTER
          Appears on all pages
      ------------------------------------------------------------ */}
      <Footer />
    </>
  );
}