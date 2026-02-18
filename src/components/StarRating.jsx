import { useState } from "react"; // importamos useState de react

function StarRating({ rating, onChange }) {         // exportamos el componente StarRating
  const [hover, setHover] = useState(null);         // usamos useState para manejar el estado del ratón

  return (
    <div className="star-container">
      {[1, 2, 3, 4, 5].map((star) => (
       <button
  key={star}
  type="button"
  className={`star ${star <= (hover || rating) ? "active" : ""}`}
  onClick={() => onChange(star)}
  onMouseEnter={() => setHover(star)}
  onMouseLeave={() => setHover(null)}
>
  ★
</button>

      ))}
    </div>
  );
}

export default StarRating;
