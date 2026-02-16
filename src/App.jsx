// aqui importamos los componentes necesarios para configurar las rutas de nuestra aplicación
// para mostrar la lista de artistas, la lista de lanzamientos, los detalles de un artista y los detalles de un lanzamiento.

import { Routes, Route } from "react-router-dom";

import ReleasesListPage from "./pages/ReleasesListPage"
import ArtistsListPage from "./pages/ArtistsListPage";
import ReleaseDetailsPage from "./pages/ReleaseDetailsPage";
import ArtistDetailsPage from "./pages/ArtistDetailsPage";


import './App.css';


export default function App() {
  return (
    <Routes>
      <Route path="/releases" element={<ReleasesListPage />} />
      <Route path="/artists" element={<ArtistsListPage />} />
      <Route path="/artists/:id" element={<ArtistDetailsPage />} />
      <Route path="/releases/:id" element={<ReleaseDetailsPage />} />
      <Route path="/" element={<h1>Welcome to the Spinsoul App</h1>} />
    </Routes>
  );
}
