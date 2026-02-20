import { Link } from "react-router-dom"; 
import StarRating from "./StarRating";

// This component renders a single Release preview card.
// It is reusable in multiple pages (list, favorites, etc).
//
// Props:
// - release: object containing release information
// - onDelete: optional function (if provided → show delete button)

export default function ReleaseCard({ release, onDelete }) {

  return (
    <div className="card">

      {/* ------------------------------------------------------------
          CONDITIONAL DELETE BUTTON
          Only visible when parent provides onDelete
          (ex: Releases page, but not in public view pages)
      ------------------------------------------------------------ */}
      {onDelete && (
        <button
          className="delete-btn"
          onClick={() => onDelete(release.id)}
        >
          <span className="delete-icon">✖</span>
          <span className="delete-tooltip">Delete release</span>
        </button>
      )}


      {/* ------------------------------------------------------------
          CLICKABLE CARD AREA
          Navigates to release details page
          Example: /releases/42
      ------------------------------------------------------------ */}
      <Link
        to={`/releases/${release.id}`}
        style={{ textDecoration: "none" }}
      >

        {/* Cover artwork */}
        <img
          className="cover"
          src={release.coverUrl}
          alt={release.title}
        />


        <div className="card-body">

          {/* Release title */}
          <h3 className="title">{release.title}</h3>

          {/* Secondary metadata */}
          <p className="subtitle">
            {release.year} • {release.genre}
          </p>


          {/* Footer: rating + id */}
          <div className="card-footer">

            {/* Visual star rating */}
            {/* If rating is undefined, treat as 0 */}
            <span className="stars">
              {"★".repeat(release.rating ?? 0)}
              {"☆".repeat(5 - (release.rating ?? 0))}
            </span>

            {/* Debug / reference id */}
            <span style={{ opacity: 0.8 }}>
              #{release.id}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}