export default function ReleaseCard({ release }) {
  return (
    <div
      style={{
        width: 220,
        border: "1px solid #ddd",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <img
        src={release.coverUrl}
        alt={release.title}
        style={{ width: "100%", height: 220, objectFit: "cover" }}
      />
      <div style={{ padding: 12 }}>
        <h3 style={{ margin: "0 0 6px" }}>{release.title}</h3>
        <p style={{ margin: 0, opacity: 0.8 }}>
          {release.year} • {release.genre}
        </p>
        <p style={{ margin: "6px 0 0" }}>⭐ {release.rating ?? "-"}</p>
      </div>
    </div>
  );
}
