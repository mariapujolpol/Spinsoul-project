import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import StarRating from "../components/StarRating";

export default function ReleaseDetailsPage() {
  const { releaseId } = useParams();

  const [release, setRelease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

   const getRatingLabel = (rating) => {
    switch (rating) {
      case 1:
        return "Noise";
      case 2:
        return "Skip";
      case 3:
        return "Okay...";
      case 4:
        return "Classic";
      case 5:
        return "LEGENDARY";
      default:
        return "Unrated";
    }
  };

  useEffect(() => {
    async function fetchRelease() {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/releases/${releaseId}`);
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

          <StarRating
  rating={release.rating ?? 0}
  onChange={async (newRating) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/releases/${releaseId}`,
        { rating: newRating }
      );

      //  Actualizamos el estado manualmente
      setRelease((prev) => ({
        ...prev,
        rating: newRating,
      }));

    } catch (err) {
      console.error(err);
    }
  }}
/>
<p className={`rating-label rating-${release.rating ?? 0}`}>
  {getRatingLabel(release.rating ?? 0)}
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
