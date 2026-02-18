import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ReleaseCard from "../components/ReleaseCard";

export default function ArtistDetailsPage() {
  const { artistId } = useParams();

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchArtist() {
      try {
        setLoading(true);
        setError("");

        // Trae artista + releases relacionados
        const artistRes = await axios.get(
          `https://spinsoul-json-server.onrender.com/artists/${artistId}`,
        );
        const releasesRes = await axios.get(
          `https://spinsoul-json-server.onrender.com/releases?artistId=${artistId}`,
        );

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
  }, [artistId]);

  if (loading) return <p className="page">Cargando artista…</p>;
  if (error) return <p className="page">{error}</p>;
  if (!artist) return <p className="page">Artista no encontrado.</p>;

  const releases = artist.releases || [];

  return (
    <div className="page">
      <div className="details">
        <img className="details-image details-image--sm" src={artist.imageUrl} alt={artist.name} />

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
