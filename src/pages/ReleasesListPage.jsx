// We import React hooks and axios for API requests
import { useState, useEffect } from "react";
import axios from "axios";
import ReleaseCard from "../components/ReleaseCard";
import LoadingOverlay from "../components/LoadingOverlay";

// ReleasesListPage displays all releases.
// It receives "query" from parent (Navbar/App) to filter results.

function ReleasesListPage({ query = "" }) {
  // ------------------------------------------------------------
  // LOCAL STATE
  // ------------------------------------------------------------

  // Holds all releases from backend
  const [releases, setReleases] = useState([]);

  // Controls loading overlay visibility
  const [loading, setLoading] = useState(true);

  // ------------------------------------------------------------
  // FETCH RELEASES ON COMPONENT MOUNT
  // ------------------------------------------------------------
  useEffect(() => {
    let mounted = true; // Prevents state update if component unmounts

    const loadReleases = async () => {
      try {
        setLoading(true);

        // FIXED: removed stray quote in your original URL
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/releases`,
        );

        // Only update state if component is still mounted
        if (mounted) {
          setReleases(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadReleases();

    // Cleanup function (runs if component unmounts)
    return () => {
      mounted = false;
    };
  }, []); // Runs once on mount

  // ------------------------------------------------------------
  // LOADING STATE
  // ------------------------------------------------------------
  if (loading) return <LoadingOverlay text="Loading records..." />;

  // ------------------------------------------------------------
  // DELETE HANDLER
  // Called when ReleaseCard delete button is clicked
  // ------------------------------------------------------------
  const handleDelete = (id) => {
    // Send DELETE request to backend
    axios
      .delete(`${import.meta.env.VITE_SERVER_URL}/releases/${id}`)
      .then(() => {
        // Optimistically update UI (remove item locally)
        setReleases((prev) => prev.filter((release) => release.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ------------------------------------------------------------
  // CLIENT-SIDE FILTERING (search by title)
  // The "query" prop comes from Navbar/App
  // ------------------------------------------------------------
  const filteredReleases = releases.filter((release) =>
    release.title.toLowerCase().includes(query.toLowerCase()),
  );

  // ------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------
  return (
    <div className="page">
      {/* Metadata row */}
      <div className="meta-row">
        <span>{filteredReleases.length} records</span>
      </div>

      {/* Grid of ReleaseCard components */}
      <div className="grid">
        {filteredReleases.map((release) => (
          <ReleaseCard
            key={release.id}
            release={release}
            onDelete={handleDelete} // enables delete mode
          />
        ))}
      </div>
    </div>
  );
}

export default ReleasesListPage;
