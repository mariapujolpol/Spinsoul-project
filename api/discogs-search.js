// This API route searches Discogs database for releases.
// Frontend usage example:
//   GET /api/discogs-search?q=daft%20punk%20discovery
//
// Purpose:
// - Keep the Discogs token server-side (never expose it to the browser)
// - Validate inputs
// - Call Discogs search endpoint
// - Return a clean, UI-friendly response

export default async function handler(req, res) {
  try {
    // ------------------------------------------------------------
    // 1) SECURITY: Read Discogs token from server environment
    // This token must NEVER be sent to the frontend
    // ------------------------------------------------------------
    const token = process.env.DISCOGS_TOKEN;

    // If missing, it's a server config issue (not a user error)
    if (!token)
      return res
        .status(500)
        .json({ ok: false, error: "Missing DISCOGS_TOKEN" });

    // ------------------------------------------------------------
    // 2) METHOD GUARD: this endpoint is read-only (GET only)
    // Prevents accidental POST/PUT calls and keeps contract simple
    // ------------------------------------------------------------
    if (req.method !== "GET")
      return res.status(405).json({ ok: false, error: "Method not allowed" });

    // ------------------------------------------------------------
    // 3) INPUT VALIDATION: we require a query string `q`
    // Example: /api/discogs-search?q=nirvana%20nevermind
    // ------------------------------------------------------------
    const q = (req.query?.q || "").toString().trim();

    // If the user didn't provide a search term, don't call Discogs
    if (!q)
      return res
        .status(400)
        .json({ ok: false, error: "Missing query param: q" });

    // ------------------------------------------------------------
    // 4) BUILD DISCOGS SEARCH URL
    // Using URL + searchParams avoids manual string concatenation bugs
    // ------------------------------------------------------------
    const url = new URL("https://api.discogs.com/database/search");

    // `q`: free-text search query
    url.searchParams.set("q", q);

    // We only want releases in results (not artists/labels/etc.)
    url.searchParams.set("type", "release");

    // Limit results to keep UI fast and predictable
    url.searchParams.set("per_page", "10");

    // ------------------------------------------------------------
    // 5) CALL DISCOGS API (server -> server)
    // Token + User-Agent are required for Discogs requests
    // ------------------------------------------------------------
    const r = await fetch(url.toString(), {
      headers: {
        "User-Agent": "spinsoul/1.0",
        Authorization: `Discogs token=${token}`,
        Accept: "application/json",
      },
    });

    // Parse Discogs JSON response
    const data = await r.json();

    // ------------------------------------------------------------
    // 6) PASS THROUGH DISCOGS ERRORS
    // If Discogs returns 401/404/429/etc, forward that clearly
    // This helps you debug UI problems (rate limit, auth, etc.)
    // ------------------------------------------------------------
    if (!r.ok) {
      return res.status(r.status).json({
        ok: false,
        discogsStatus: r.status,
        discogsResponse: data,
      });
    }

    // ------------------------------------------------------------
    // 7) NORMALIZE RESULTS FOR THE UI
    // Discogs search results include a lot of fields.
    // We only return what the UI needs (smaller payload, cleaner data).
    // ------------------------------------------------------------
    const results = (data.results || []).map((x) => ({
      id: x.id,

      // Discogs often returns titles like: "Artist - Release"
      title: x.title,

      // Optional metadata (may be missing depending on Discogs entry)
      year: x.year,
      country: x.country,

      // Discogs can return genre as an array (sometimes missing)
      genre: x.genre,

      // Useful for thumbnails / previews
      cover_image: x.cover_image,

      // Useful if you ever want to deep-link or debug the Discogs entry
      resource_url: x.resource_url,
    }));

    // ------------------------------------------------------------
    // 8) FINAL RESPONSE TO FRONTEND
    // `q` is echoed back so the UI can confirm which query was served
    // ------------------------------------------------------------
    res.status(200).json({ ok: true, q, results });
  } catch (err) {
    // ------------------------------------------------------------
    // 9) SAFETY NET
    // Any unexpected crash ends here instead of failing silently
    // ------------------------------------------------------------
    res.status(500).json({ ok: false, error: err?.message || "Unknown error" });
  }
}