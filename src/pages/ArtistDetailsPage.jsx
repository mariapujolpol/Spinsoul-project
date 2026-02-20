import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ReleaseCard from "../components/ReleaseCard";

// Page that displays:
// 1) Artist info
// 2) All releases belonging to that artist

export default function ArtistDetailsPage() {
  // ------------------------------------------------------------
  // ROUTE PARAM
  // URL example: /artists/3
  // artistId = "3"
  // ------------------------------------------------------------
  const { artistId } = useParams();

  // Artist object including releases
  const [artist, setArtist] = useState(null);

  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ------------------------------------------------------------
  // FETCH DATA WHEN PAGE LOADS OR artistId CHANGES
  // ------------------------------------------------------------
  useEffect(() => {
    async function fetchArtist() {
      try {
        setLoading(true);
        setError("");

        // --------------------------------------------------------
        // 1) Fetch artist information
        // GET /artists/3
        // --------------------------------------------------------
        const artistRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/artists/${artistId}`,
        );

        // --------------------------------------------------------
        // 2) Fetch related releases
        // GET /releases?artistId=3
        // (JSON Server relation query)
        // --------------------------------------------------------
        const releasesRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/releases?artistId=${artistId}`,
        );

        // --------------------------------------------------------
        // 3) Combine data into a single object
        // This creates a frontend "joined" model
        // --------------------------------------------------------
        setArtist({
          ...artistRes.data,
          releases: releasesRes.data,
        });
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el artista.");
      } finally {
        setLoading(false);
      }
    }

    fetchArtist();
  }, [artistId]); // runs again if user navigates to another artist

  // ------------------------------------------------------------
  // UI STATES
  // ------------------------------------------------------------
  if (loading) return <p className="page">Cargando artista…</p>;
  if (error) return <p className="page">{error}</p>;
  if (!artist) return <p className="page">Artista no encontrado.</p>;

  // Ensure releases array always exists
  const releases = artist.releases || [];

  return (
    <div className="page">
      <div className="details">
        <img
          className="details-image details-image--sm"
          src={artist.imageUrl}
          alt={artist.name}
        />

        <div className="details-body">
          <h1 className="details-title">{artist.name}</h1>
          <p className="details-subtitle">{artist.country}</p>

          {artist.bio && <p className="details-text">{artist.bio}</p>}

          <div className="details-actions">
            <Link className="btn-secondary link-reset" to="/artists">
              ← Back to Artists
            </Link>
          </div>
        </div>
      </div>

      <div className="meta-row meta-row-spaced">
        <span>Releases by {artist.name}</span>
        <span className="muted">{releases.length} records</span>
      </div>

      <div className="grid">
        {releases.map((release) => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </div>
    </div>
  );
}
