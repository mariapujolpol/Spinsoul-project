import { Link } from "react-router-dom"; // importamos Link de react-router-dom para crear enlaces a otras páginas dentro de nuestra aplicación

export default function ReleaseCard({ release, onDelete }) { // esta funcion exporta el componente ReleaseCard, que recibe un objeto release con la información del lanzamiento y una función onDelete para eliminar el lanzamiento (si se proporciona)
  return (
    <div className="card">

      {onDelete && ( // si se proporciona la función onDelete, mostramos un botón de eliminar en la esquina superior derecha de la tarjeta en releases
        <button
          className="delete-btn"
          onClick={() => onDelete(release.id)}
        >
          ✖
        </button>
      )}

      <Link // usamos Link para crear un enlace a la página de detalles del lanzamiento, pasando el id del lanzamiento en la URL
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


