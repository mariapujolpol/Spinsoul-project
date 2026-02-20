import { Link } from "react-router-dom";

// This component renders a single Artist preview card.
// It is purely presentational — it does NOT fetch data.
// It only receives an "artist" object and displays it.

export default function ArtistCard({ artist }) {

  // The "artist" prop is expected to look like:
  // {
  //   id: number|string,
  //   name: string,
  //   country: string,
  //   imageUrl: string
  // }

  return (

    // ------------------------------------------------------------
    // The whole card is clickable
    // Clicking navigates to the Artist Details page
    // Example: /artists/12
    // ------------------------------------------------------------
    <Link to={`/artists/${artist.id}`} style={{ textDecoration: "none" }}>

      {/* Card container */}
      <div className="card">

        {/* Artist image (thumbnail/cover) */}
        {/* We rely on the parent component to provide a valid imageUrl */}
        <img
          className="cover"
          src={artist.imageUrl}
          alt={artist.name}
        />

        {/* Text information */}
        <div className="card-body">

          {/* Artist name (main info) */}
          <h3 className="title">{artist.name}</h3>

          {/* Secondary info */}
          <p className="subtitle">{artist.country}</p>

        </div>
      </div>
    </Link>
  );
}