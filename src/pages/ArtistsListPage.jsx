import { useState, useEffect } from "react";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";
import LoadingOverlay from "../components/LoadingOverlay";

function ArtistsListPage({ query = "" }) {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadArtists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://spinsoul-json-server.onrender.com/artists"
        );

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

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <LoadingOverlay text="Loading artists..." />;

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(query.toLowerCase())
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
