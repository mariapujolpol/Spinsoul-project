import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReleaseCard from "../components/ReleaseCard";

function HomePage({ query }) {
  const [artists, setArtists] = useState([]);
  const [releases, setReleases] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleReset = () => {
  setSelectedGenre("");
  setSelectedCountry("");
};

  useEffect(() => {
    axios
      .get("https://spinsoul-json-server.onrender.com/artists")
      .then((res) => setArtists(res.data))
      .catch((err) => console.error(err));

    axios
      .get("https://spinsoul-json-server.onrender.com/releases")
      .then((res) => setReleases(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredReleases = releases.filter((release) => {

  const matchesSearch =
    release.title.toLowerCase().includes(query?.toLowerCase() || "");

  const matchesGenre =
    selectedGenre === "" || release.genre === selectedGenre;

  const artist = artists.find(
    (artist) => Number(artist.id) === release.artistId
  );

  const matchesCountry =
    selectedCountry === "" || artist?.country === selectedCountry;

  return matchesSearch && matchesGenre && matchesCountry;
});
const filteredArtists = artists.filter((artist) => {

  const matchesSearch =
    artist.name.toLowerCase().includes(query?.toLowerCase() || "");

  const matchesCountry =
    selectedCountry === "" || artist.country === selectedCountry;

  const hasReleaseWithGenre =
    selectedGenre === "" ||
    releases.some(
      (release) =>
        release.artistId === Number(artist.id) &&
        release.genre === selectedGenre
    );

  return matchesSearch && matchesCountry && hasReleaseWithGenre;
});

const suggestedReleases = filteredReleases.slice(0, 10);
const suggestedArtists = filteredArtists.slice(0, 10);

  return (
    <div className="page">
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
            <Link className="btn" to="/releases" style={{ textDecoration: "none" }}>
              Explore Records
            </Link>

            <Link className="btn-secondary" to="/artists" style={{ textDecoration: "none" }}>
              Browse Artists
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-filters">
            <select
              className="select"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">Select Genre</option>
              <option value="Electronic">Electronic</option>
              <option value="Alternative">Alternative</option>
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="Jazz">Jazz</option>
              <option value="Metal">Metal</option>
            </select>

            <select
              className="select"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="France">France</option>
              <option value="Iceland">Iceland</option>
              <option value="Puerto Rico">Puerto Rico</option>
            </select>

            <Link
              className="btn hero-btn-full"
              to="/artists"
              style={{ textDecoration: "none" }}
            >
              Explore Artists
            </Link>
            <button className="btn hero-btn-full"
            onClick={handleReset}
            style={{ textDecoration: "none" }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </section>

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
