import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ImportDiscogsPage() {

  // React Router navigation (used after picking a release)
  const navigate = useNavigate();

  // Search text typed by the user
  const [q, setQ] = useState("");

  // Search results from Discogs
  const [results, setResults] = useState([]);

  // True while we are searching
  const [loading, setLoading] = useState(false);

  // True only for the specific item currently being imported
  const [loadingId, setLoadingId] = useState(null);

  // UI error message
  const [error, setError] = useState("");


  // ------------------------------------------------------------
  // "Debounce input"
  // We don't want to call the API on every keystroke instantly.
  // We only react after the user stops typing.
  //
  // NOTE: This is not a real debounce — just trimming the value.
  // The actual delay happens inside useEffect with setTimeout.
  // ------------------------------------------------------------
  const debouncedQ = useMemo(() => q.trim(), [q]);


  // ------------------------------------------------------------
  // SEARCH EFFECT
  // Runs whenever the user types something new
  // Calls: /api/discogs-search
  // ------------------------------------------------------------
  useEffect(() => {

    // If empty input → clear results and do nothing
    if (!debouncedQ) {
      setResults([]);
      setError("");
      return;
    }

    // Delay search 400ms so we don't spam the API
    const t = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        // Call our backend search endpoint (NOT Discogs directly)
        const r = await fetch(
          `/api/discogs-search?q=${encodeURIComponent(debouncedQ)}`,
        );

        const data = await r.json();

        // Backend signals error using { ok:false }
        if (!data.ok) throw new Error(data?.error || "Search failed");

        // Store clean results returned by our API
        setResults(data.results || []);

      } catch (e) {
        // If network or API fails → show error and clear results
        setError(e.message || "Search error");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    // If user keeps typing → cancel previous timer
    return () => clearTimeout(t);

  }, [debouncedQ]);


  // ------------------------------------------------------------
  // PICK A RELEASE
  // Called when user clicks "Import"
  // Calls: /api/discogs-release
  // Then navigates to the create page with prefilled data
  // ------------------------------------------------------------
  async function handlePick(id) {
    try {
      setLoadingId(id);
      setError("");

      // Ask backend for full release info
      const r = await fetch(
        `/api/discogs-release?id=${encodeURIComponent(id)}`,
      );

      const data = await r.json();

      if (!data.ok) throw new Error(data?.error || "Release fetch failed");

      // Choose the best genre candidate
      const genre =
        (data.styles && data.styles[0]) ||
        (data.genres && data.genres[0]) ||
        "";

      // This object becomes the "prefill" for AddRecordPage
      const mapped = {
        title: data.title || "",
        artist: data.artist || "",
        year: data.year || "",
        genre,
        coverUrl: data.coverUrl || "",
        review: data.review || "",
      };

      // Navigate and pass data via router state
      // The form page will read location.state
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0 }}>Import from Discogs</h1>
          <button className="btn-secondary" onClick={() => navigate(-1)}>
            ← Back
          </button>
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
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 8,
                      border: "1px solid #333",
                    }}
                  />
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
