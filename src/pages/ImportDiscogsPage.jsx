import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ImportDiscogsPage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState("");

  // Debounce simple (400ms)
  const debouncedQ = useMemo(() => q.trim(), [q]);

  useEffect(() => {
    if (!debouncedQ) {
      setResults([]);
      setError("");
      return;
    }

    const t = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const r = await fetch(`/api/discogs-search?q=${encodeURIComponent(debouncedQ)}`);
        const data = await r.json();

        if (!data.ok) throw new Error(data?.error || "Search failed");
        setResults(data.results || []);
      } catch (e) {
        setError(e.message || "Search error");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(t);
  }, [debouncedQ]);

  async function handlePick(id) {
    try {
      setLoadingId(id);
      setError("");

      const r = await fetch(`/api/discogs-release?id=${encodeURIComponent(id)}`);
      const data = await r.json();

      if (!data.ok) throw new Error(data?.error || "Release fetch failed");

      const genre = (data.styles && data.styles[0]) || (data.genres && data.genres[0]) || "";

      // esto es lo que tu AddRecordPage va a usar para prefill
      const mapped = {
        title: data.title || "",
        artist: data.artist || "",
        year: data.year || "",
        genre,
        coverUrl: data.coverUrl || "",
      };

      navigate("/releases/new", { state: mapped });
    } catch (e) {
      setError(e.message || "Pick error");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <h1 style={{ margin: 0 }}>Import from Discogs</h1>
          <button className="btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <div style={{ marginTop: 16 }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search artist + release (e.g. Daft Punk Discovery)"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #333",
              background: "transparent",
              color: "inherit",
            }}
          />
          {loading && <p style={{ opacity: 0.8, marginTop: 10 }}>Searching…</p>}
          {error && <p style={{ color: "tomato", marginTop: 10 }}>{error}</p>}
        </div>

        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          {results.map((x) => (
            <button
              key={x.id}
              onClick={() => handlePick(x.id)}
              className="btn-secondary"
              style={{
                textAlign: "left",
                display: "flex",
                gap: 12,
                alignItems: "center",
                justifyContent: "space-between",
                padding: 12,
              }}
              disabled={loadingId !== null}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {x.cover_image ? (
                  <img
                    src={x.cover_image}
                    alt=""
                    style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ width: 44, height: 44, borderRadius: 8, border: "1px solid #333" }} />
                )}

                <div>
                  <div style={{ fontWeight: 700 }}>{x.title}</div>
                  <div style={{ opacity: 0.75, fontSize: 13 }}>
                    {x.year ? `${x.year} • ` : ""}
                    {x.country || ""}
                  </div>
                </div>
              </div>

              <div style={{ opacity: 0.9 }}>
                {loadingId === x.id ? "Importing…" : "Import"}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
