import { Link } from "react-router-dom";
import "./ReleaseCard.css";

export default function ReleaseCard({ release }) {
  return (

    <div className="release-card">
      <img
        src={release.coverUrl}
        alt={release.title}
        className="release-card__image"
      />
      <div className="release-card__content">
        <h3 className="release-card__title">{release.title}</h3>
        <p className="release-card__info">
          {release.year} • {release.genre}
        </p>
        <p className="release-card__rating">⭐ {release.rating ?? "-"}</p>
      </div>
    </div>
  );
}
