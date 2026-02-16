import { Link } from "react-router-dom";
import "./ArtistCard.css";

function ArtistCard({ artist }) {
    return (
        <div className="artist-card">
            <img src={artist.imageUrl} alt={artist.name} className="artist-card__image" />
            <div className="artist-card__content">
                <h2 className="artist-card__name">{artist.name}</h2>
                <p className="artist-card__country">{artist.country}</p>
            </div>
        </div>


        
    )
}

export default ArtistCard;