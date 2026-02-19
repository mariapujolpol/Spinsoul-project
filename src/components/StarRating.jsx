function StarRating({ rating = 0 }) {
  const value = Number(rating) || 0;

  return (
    <span className="stars">
      {"★".repeat(value)}
      {"☆".repeat(5 - value)}
    </span>
  );
}

export default StarRating;
