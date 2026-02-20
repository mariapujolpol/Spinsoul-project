import { useState, useEffect } from "react";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";
import LoadingOverlay from "../components/LoadingOverlay";

// This page:
// 1) Fetches all artists from backend
// 2) Applies client-side filtering (search query)
// 3) Displays a list of ArtistCard components

function ArtistsListPage({ query = "" }) {
  // ------------------------------------------------------------
  // LOCAL STATE
  // ------------------------------------------------------------

  // Holds all artists from backend
  const [artists, setArtists] = useState([]);

  // Controls loading overlay visibility
  const [loading, setLoading] = useState(true);

  // ------------------------------------------------------------
  // FETCH ARTISTS ON COMPONENT MOUNT
  // ------------------------------------------------------------
  useEffect(() => {
    // Safety flag to prevent state update if component unmounts
    let mounted = true;

    const loadArtists = async () => {
      try {
        setLoading(true);

        // Request all artists from backend
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/artists`,
        );

        // Only update state if component is still mounted
        if (mounted) {
          setArtists(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadArtists();

    // Cleanup function:
    // Runs if component unmounts before request finishes
    return () => {
      mounted = false;
    };
  }, []); // Empty dependency array → runs only once

  // ------------------------------------------------------------
  // LOADING STATE
  // ------------------------------------------------------------
  if (loading) return <LoadingOverlay text="Loading artists..." />;

  // ------------------------------------------------------------
  // CLIENT-SIDE FILTERING
  // ------------------------------------------------------------
  // The parent (Navbar/App) passes the "query" prop.
  // We filter locally instead of refetching from server.
  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="page">
      <div className="meta-row">
        <span>{filteredArtists.length} artists</span>
      </div>

      <div className="grid">
        {filteredArtists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default ArtistsListPage;
