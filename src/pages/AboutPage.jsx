export default function AboutPage() {
  return (
    <div className="page">
      <h2>About SpinSoul</h2>

      <p style={{ color: "rgba(255,255,255,.65)", maxWidth: 760 }}>
        SpinSoul is a personal music dashboard to track, rate, and curate your
        record collection. It focuses on quick browsing, clean metadata, and a
        smooth workflow to add and explore releases and artists.
      </p>

      <div style={{ marginTop: 18, maxWidth: 760 }}>
        <h3 style={{ marginBottom: 8 }}>What you can do</h3>
        <ul
          style={{
            color: "rgba(255,255,255,.75)",
            lineHeight: 1.7,
            marginTop: 0,
          }}
        >
          <li>Browse releases and artists in a simple card-based layout.</li>
          <li>Search across your library from the top bar.</li>
          <li>Filter by genre and artist country on the Home page.</li>
          <li>Open artist pages to see all related releases.</li>
          <li>Rate releases (1–5 stars) and write short reviews.</li>
          <li>Add records manually or import them from Discogs.</li>
        </ul>
      </div>

      <div style={{ marginTop: 18, maxWidth: 760 }}>
        <h3 style={{ marginBottom: 8 }}>Credits</h3>
        <ul
          style={{
            color: "rgba(255,255,255,.75)",
            lineHeight: 1.7,
            marginTop: 0,
          }}
        >
          <li>
            Maria Pol Pujol —{" "}
            <a
              href="https://github.com/mariapujolpol"
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              GitHub
            </a>
          </li>
          <li>
            Mauricio Rojas Morales —{" "}
            <a
              href="https://github.com/mauricioalonsorojasm-oss"
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>

      <p
        style={{ color: "rgba(255,255,255,.55)", marginTop: 22, maxWidth: 760 }}
      >
        © {new Date().getFullYear()} SpinSoul
      </p>
    </div>
  );
}
