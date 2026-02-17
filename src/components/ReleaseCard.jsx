import { Link } from "react-router-dom";

export default function ReleaseCard({ release }) {
  return (
    <Link to={`/releases/${release.id}`} style={{ textDecoration: "none" }}>
      <div className="card">
        <img className="cover" src={release.coverUrl} alt={release.title} />

        <div className="card-body">
          <h3 className="title">{release.title}</h3>
          <p className="subtitle">
            {release.year} • {release.genre}
          </p>

          <div className="card-footer">
            <span className="stars">
              {"★".repeat(release.rating ?? 0)}
              {"☆".repeat(5 - (release.rating ?? 0))}
            </span>
            <span style={{ opacity: 0.8 }}>#{release.id}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
