import { Link } from "react-router-dom";

export default function ReleaseCard({ release, onDelete }) {
  return (
    <div className="card">

      {onDelete && (
        <button
          className="delete-btn"
          onClick={() => onDelete(release.id)}
        >
          ✖
        </button>
      )}

      <Link
        to={`/releases/${release.id}`}
        style={{ textDecoration: "none" }}
      >
        <img
          className="cover"
          src={release.coverUrl}
          alt={release.title}
        />

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
      </Link>

    </div>
  );
}



// En este componente importamos Link de react-router-dom y lo usamos para crear un enlace a la página de detalles del lanzamiento
// Para el navbar hacemos que se muestre como en Footer y con un enlace a la página de detalles del lanzamiento
