// This file defines an API endpoint (server-side).
// The frontend will call:  /api/discogs-release?id=12345
// handler receives the HTTP request (req) and sends a response (res)

export default async function handler(req, res) {
  try {
    // ------------------------------------------------------------
    // 1) SECURITY: We never expose the Discogs token to the browser
    // It must live only on the server in environment variables
    // ------------------------------------------------------------
    const token = process.env.DISCOGS_TOKEN;

    // If token is missing the server is misconfigured
    if (!token)
      return res
        .status(500)
        .json({ ok: false, error: "Missing DISCOGS_TOKEN" });


    // ------------------------------------------------------------
    // 2) METHOD GUARD
    // This endpoint is read-only → only GET is allowed
    // Prevents accidental POST/PUT calls from frontend
    // ------------------------------------------------------------
    if (req.method !== "GET")
      return res.status(405).json({ ok: false, error: "Method not allowed" });


    // ------------------------------------------------------------
    // 3) INPUT VALIDATION
    // We expect a query parameter: /api/discogs-release?id=249504
    // ------------------------------------------------------------
    const id = (req.query?.id || "").toString().trim();

    // If the user didn't send an id → no point calling Discogs
    if (!id)
      return res
        .status(400)
        .json({ ok: false, error: "Missing query param: id" });


    // ------------------------------------------------------------
    // 4) BUILD THE DISCOGS REQUEST
    // encodeURIComponent protects against invalid characters
    // ------------------------------------------------------------
    const url = `https://api.discogs.com/releases/${encodeURIComponent(id)}`;


    // ------------------------------------------------------------
    // 5) CALL DISCOGS API (SERVER → SERVER REQUEST)
    // This hides your API token from the client
    // ------------------------------------------------------------
    const r = await fetch(url, {
      headers: {
        "User-Agent": "spinsoul/1.0", // Discogs requires a user agent
        Authorization: `Discogs token=${token}`, // authentication
        Accept: "application/json",
      },
    });

    // Parse the response JSON from Discogs
    const data = await r.json();


    // ------------------------------------------------------------
    // 6) HANDLE DISCOGS ERRORS
    // If Discogs returns 404, 401, etc → forward it to frontend
    // This helps debugging UI errors
    // ------------------------------------------------------------
    if (!r.ok) {
      return res.status(r.status).json({
        ok: false,
        discogsStatus: r.status,
        discogsResponse: data,
      });
    }


    // ------------------------------------------------------------
    // 7) DATA NORMALIZATION (VERY IMPORTANT)
    // Discogs data is messy and inconsistent.
    // Here we "clean" it into a predictable structure for your form.
    // ------------------------------------------------------------

    // Safely extract the first artist name
    const artist =
      data.artists && data.artists[0] && data.artists[0].name
        ? data.artists[0].name
        : "";

    // Extract cover image (Discogs sometimes uses uri OR resource_url)
    const coverUrl =
      data.images &&
      data.images[0] &&
      (data.images[0].uri || data.images[0].resource_url)
        ? data.images[0].uri || data.images[0].resource_url
        : "";

    // Ensure arrays always exist (prevents frontend crashes)
    const genres = Array.isArray(data.genres) ? data.genres : [];
    const styles = Array.isArray(data.styles) ? data.styles : [];


    // ------------------------------------------------------------
    // 8) GENERATE A HUMAN READABLE DESCRIPTION
    // This is not from Discogs — you are auto-writing a review
    // ------------------------------------------------------------

    const primary = (styles && styles[0]) || (genres && genres[0]) || "music";
    const extras = (styles && styles.slice(1, 3)) || [];

    let vibe = primary;
    if (extras.length === 1) vibe = `${primary} with ${extras[0]} touches`;
    if (extras.length >= 2)
      vibe = `${primary} blending ${extras[0]} and ${extras[1]}`;

    const country = data.country || "";
    const yearText = data.year ? String(data.year) : "";

    let review = `${data.title} is ${artist}'s ${yearText} album, a ${vibe} release.`;
    review += country
      ? ` First issued in ${country}.`
      : ` A defining entry in its era.`;


    // ------------------------------------------------------------
    // 9) FINAL RESPONSE TO FRONTEND
    // This is the ONLY data your React form needs
    // Everything is now predictable and safe
    // ------------------------------------------------------------
    res.status(200).json({
      ok: true,

      // clean fields for your form
      id: data.id,
      title: data.title || "",
      artist,
      year: data.year || "",
      genres,
      styles,
      coverUrl,
      review,

      // extra optional info (debug/UI improvements)
      country: data.country || "",
      labels: (data.labels || []).map((l) => l.name).slice(0, 5),
    });

  } catch (err) {
    // ------------------------------------------------------------
    // 10) GLOBAL SAFETY NET
    // Any unexpected crash ends here instead of killing the server
    // ------------------------------------------------------------
    res.status(500).json({ ok: false, error: err?.message || "Unknown error" });
  }
}