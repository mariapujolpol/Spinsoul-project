import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import StarRating from "../components/StarRating";

// ReleaseDetailsPage shows the details of ONE release.
// It reads the releaseId from the URL and fetches the release from the backend.
//
// URL example: /releases/42
// releaseId = "42"

export default function ReleaseDetailsPage() {
  // ------------------------------------------------------------
  // ROUTE PARAM
  // Grabs the :releaseId from the URL
  // ------------------------------------------------------------
  const { releaseId } = useParams();

  // ------------------------------------------------------------
  // LOCAL STATE
  // ------------------------------------------------------------
  const [release, setRelease] = useState(null); // will hold release object from backend
  const [loading, setLoading] = useState(true); // controls loading UI
  const [error, setError] = useState(""); // user-friendly error message

  // ------------------------------------------------------------
  // RATING LABEL HELPER
  // Converts numeric rating (1..5) into a text label for UX
  // This is purely UI logic — it doesn't affect stored data.
  // ------------------------------------------------------------
  const getRatingLabel = (rating) => {
    switch (rating) {
      case 1:
        return "Pure noise...";
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

  // ------------------------------------------------------------
  // FETCH RELEASE DATA
  // Runs on first render and whenever releaseId changes
  // ------------------------------------------------------------
  useEffect(() => {
    async function fetchRelease() {
      try {
        setLoading(true);
        setError("");

        // GET one release by id
        // Example: GET http://localhost:5005/releases/42
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/releases/${releaseId}`,
        );

        // Store the release object in state
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

  // ------------------------------------------------------------
  // UI STATES
  // ------------------------------------------------------------
  if (loading) return <p className="page">Cargando release…</p>;
  if (error) return <p className="page">{error}</p>;
  if (!release) return <p className="page">Release no encontrado.</p>;

  // ------------------------------------------------------------
  // From here onward, "release" is guaranteed to exist
  // Typical next steps in the JSX return:
  // - show cover image, title, year, genre
  // - show rating stars + label using getRatingLabel(release.rating)
  // - show review text
  // - show a Link back to the list (e.g. /releases)
  // ------------------------------------------------------------

  return (
    <div className="page">
      <div className="details">
        <img
          className="details-image details-image--cover"
          src={release.coverUrl}
          alt={release.title}
        />

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
                  { rating: newRating },
                );

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
            <Link
              className="btn-secondary"
              to="/releases"
              style={{ textDecoration: "none" }}
            >
              ← Back to Releases
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
