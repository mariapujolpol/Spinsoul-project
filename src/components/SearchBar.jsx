// Reusable search input component
// This component does NOT store its own state.
// The parent component controls the value.

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {

  return (
    <input

      // ------------------------------------------------------------
      // CONTROLLED VALUE
      // The displayed text always comes from parent state
      // ------------------------------------------------------------
      value={value}

      // ------------------------------------------------------------
      // USER TYPES → notify parent
      // We send ONLY the text, not the event object
      // Parent decides what to do with it (filter, API call, etc.)
      // ------------------------------------------------------------
      onChange={(e) => onChange(e.target.value)}

      // Default text shown when empty
      placeholder={placeholder}

      // Inline styles for layout consistency
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