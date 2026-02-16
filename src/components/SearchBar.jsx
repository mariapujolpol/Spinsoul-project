export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        maxWidth: 420,
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #ccc",
      }}
    />
  );
}
