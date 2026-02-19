import { useState } from "react";

function StarRating({ rating = 0, onChange }) {
  const [hover, setHover] = useState(null);

  const value = Number(rating) || 0;

  return (
    <div className="stars">
      {[1,2,3,4,5].map((star) => {
        const isActive = star <= (hover ?? value);

        return (
          <span
            key={star}
            style={{ cursor: onChange ? "pointer" : "default" }}
            onClick={() => onChange && onChange(star)}
            onMouseEnter={() => onChange && setHover(star)}
            onMouseLeave={() => onChange && setHover(null)}
          >
            {isActive ? "★" : "☆"}
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
