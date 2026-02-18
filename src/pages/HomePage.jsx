import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReleaseCard from "../components/ReleaseCard";

function HomePage() {
  const [artists, setArtists] = useState([]);
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    // usamos el useEffect para ejecutar el código cuando el componente se monta
    axios
      .get("http://localhost:5005/artists") // usamos axios para hacer la petición a la API para traer los artistas y guardarlos en el estado
      .then((res) => setArtists(res.data))
      .catch((err) => console.error(err));

    axios
      .get("http://localhost:5005/releases") // y aqui hacemos lo mismo para los lanzamientos (releases)
      .then((res) => setReleases(res.data))
      .catch((err) => console.error(err));
  }, []);

  const suggestedReleases = releases.slice(0, 10);
  const suggestedArtists = artists.slice(0, 10);

  return (
    <div className="page">
      {" "}
      {/* Aqui creamos la estructura de la página con diferentes secciones como el navbar, el hero y el footer */}
      {/* HERO */}
      <section className="hero-card">
        <div className="hero-left">
          <h1 className="hero-title">
            Discover the Sound <br /> of the World
          </h1>
          <p className="hero-text">
            Build your vinyl dashboard: track releases, rate them, and explore
            artists.
          </p>

          <div className="hero-actions">
            <Link
              className="btn"
              to="/releases"
              style={{ textDecoration: "none" }}
            >
              Explore Records
            </Link>

            <Link
              className="btn-secondary"
              to="/artists"
              style={{ textDecoration: "none" }}
            >
              Browse Artists
            </Link>
          </div>
        </div>

        <div className="hero-right">
          {" "}
          {/* Aqui creamos la sección de filtros para buscar lanzamientos y artistas pero lo tenemos que acabar con la parte de la API */}
          <div className="hero-filters">
            <select className="select">
              <option value="">Select Genre</option>
              <option value="Electronic">Electronic</option>
              <option value="Alternative">Alternative</option>
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="Jazz">Jazz</option>
              <option value="Metal">Metal</option>
            </select>

            <select className="select">
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="France">France</option>
              <option value="Iceland">Iceland</option>
            </select>

            <Link
              className="btn hero-btn-full"
              to="/artists"
              style={{ textDecoration: "none" }}
            >
              Explore Artists
            </Link>

            <p className="hero-note">
              {/* * Filters are UI-only for now (we’ll connect them later). */}
            </p>
          </div>
        </div>
      </section>
      {/* SUGGESTED RELEASES */}
      <div className="meta-row">
        <span>✨ Suggested Releases</span>
        <Link className="meta-link" to="/releases">
          See all →
        </Link>
      </div>
      <div className="grid">
        {suggestedReleases.map((release) => (
          <ReleaseCard key={release.id} release={release} onDelete={null} />
        ))}
      </div>
      {/* SUGGESTED ARTISTS */}
      <div className="meta-row meta-row-spaced">
        <span>✨ Suggested Artists</span>
        <Link className="meta-link" to="/artists">
          Browse →
        </Link>
      </div>
      <div className="grid">
        {suggestedArtists.map((artist) => (
          <Link
            key={artist.id}
            to={`/artists/${artist.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="card">
              <img className="cover" src={artist.imageUrl} alt={artist.name} />
              <div className="card-body">
                <h3 className="title">{artist.name}</h3>
                <p className="subtitle">{artist.country}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
