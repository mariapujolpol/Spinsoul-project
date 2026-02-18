// importamos las dependencias necesarias para nuestra aplicación, incluyendo React Router para manejar las rutas y useState para manejar el estado del query de búsqueda

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


export default function App() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleAddRecord() {
    // cuando tengamos el form, cambia a: navigate("/releases/new")
    navigate("/releases/new");
  }

  return (  
    <>
      <Navbar query={query} setQuery={setQuery} onAddRecord={handleAddRecord} /> {/* Aquí pasamos el query y la función para actualizarlo al Navbar para que pueda manejar la búsqueda */}

      <Routes> {/* Aquí definimos las rutas de nuestra aplicación con React Router para cada una de las vistas */}
        <Route path="/" element={<HomePage />} />

        <Route path="/releases" element={<ReleasesListPage query={query} />} />

        <Route path="/artists" element={<ArtistsListPage query={query}/>} />
        <Route path="/artists/:artistId" element={<ArtistDetailsPage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/releases/:releaseId" element={<ReleaseDetailsPage />} />


        <Route path="/releases/new" element={<AddRecordPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
