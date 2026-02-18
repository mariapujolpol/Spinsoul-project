export default function Spinner({ size = 20, color = "#ffffff" }) {
  return (
    <div
      className="spinner"
      style={{
        width: size,
        height: size,
        borderTopColor: color
      }}
    />
  );
}
