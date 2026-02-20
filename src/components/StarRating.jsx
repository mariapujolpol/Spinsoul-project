import { useState } from "react";

// StarRating can behave in two ways:
//
// 1) Display mode (read-only)
//    <StarRating rating={3} />
//
// 2) Input mode (interactive)
//    <StarRating rating={3} onChange={setRating} />
//
// The presence of onChange determines if user interaction is allowed.

function StarRating({ rating = 0, onChange }) {

  // ------------------------------------------------------------
  // Hover state
  // Temporary visual preview while the mouse is over the stars
  // Does NOT permanently change the rating
  // ------------------------------------------------------------
  const [hover, setHover] = useState(null);

  // Ensure rating is always a number
  // Prevents NaN errors if undefined/null/string
  const value = Number(rating) || 0;


  return (
    <div className="stars">

      {/* ------------------------------------------------------------
          Render 5 stars dynamically
          Each star represents a value from 1 → 5
      ------------------------------------------------------------ */}
      {[1, 2, 3, 4, 5].map((star) => {

        // If hovering → preview value
        // Otherwise → show actual rating
        const isActive = star <= (hover ?? value);

        return (
          <span
            key={star}

            // Cursor indicates interactivity only in input mode
            style={{ cursor: onChange ? "pointer" : "default" }}

            // Click sets rating ONLY if component is interactive
            onClick={() => onChange && onChange(star)}

            // Hover preview (temporary visual feedback)
            onMouseEnter={() => onChange && setHover(star)}
            onMouseLeave={() => onChange && setHover(null)}
          >
            {/* Filled vs empty star */}
            {isActive ? "★" : "☆"}
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;