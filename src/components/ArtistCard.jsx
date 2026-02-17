import { Link } from "react-router-dom";

export default function ArtistCard({ artist }) {
  return (
    <Link to={`/artists/${artist.id}`} style={{ textDecoration: "none" }}>
      <div className="card">
        <img className="cover" src={artist.imageUrl} alt={artist.name} />
        <div className="card-body">
          <h3 className="title">{artist.name}</h3>
          <p className="subtitle">{artist.country}</p>
        </div>
      </div>
    </Link>
  );
}
