export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)} // Actualizamos el estado con el valor del input haciendo una llamada a la función onChange
      placeholder={placeholder} // Definimos el placeholder del input
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


// Aqui importamos el componente SearchBar para buscar records creaundo un input que nos permite buscar records.