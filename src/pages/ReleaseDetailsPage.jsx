import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ReleaseDetailsPage() {
  const { releaseId } = useParams();

  const [release, setRelease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRelease() {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`http://localhost:5005/releases/${releaseId}`);
        setRelease(res.data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el release.");
      } finally {
        setLoading(false);
      }
    }

    fetchRelease();
  }, [releaseId]);

  if (loading) return <p className="page">Cargando release…</p>;
  if (error) return <p className="page">{error}</p>;
  if (!release) return <p className="page">Release no encontrado.</p>;

  return (
    <div className="page">
      <div className="details">
        <img className="details-image details-image--cover" src={release.coverUrl} alt={release.title} />

        <div className="details-body">
          <h1 className="details-title">{release.title}</h1>

          <p className="details-subtitle">
            {release.year ? `${release.year} • ` : ""}
            {release.genre || ""}
          </p>

          <p style={{ margin: "10px 0 0" }}>
            <span className="stars">
              {"★".repeat(release.rating ?? 0)}
              {"☆".repeat(5 - (release.rating ?? 0))}
            </span>
          </p>

          {release.review && <p className="details-text">{release.review}</p>}

          <div className="details-actions">
            <Link className="btn-secondary" to="/releases" style={{ textDecoration: "none" }}>
              ← Back to Releases
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
