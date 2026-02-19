export default async function handler(req, res) {
  try {
    const token = process.env.DISCOGS_TOKEN;
    if (!token)
      return res
        .status(500)
        .json({ ok: false, error: "Missing DISCOGS_TOKEN" });

    if (req.method !== "GET")
      return res.status(405).json({ ok: false, error: "Method not allowed" });

    const id = (req.query?.id || "").toString().trim();
    if (!id)
      return res
        .status(400)
        .json({ ok: false, error: "Missing query param: id" });

    const url = `https://api.discogs.com/releases/${encodeURIComponent(id)}`;

    const r = await fetch(url, {
      headers: {
        "User-Agent": "spinsoul/1.0",
        Authorization: `Discogs token=${token}`,
        Accept: "application/json",
      },
    });

    const data = await r.json();

    if (!r.ok) {
      return res.status(r.status).json({
        ok: false,
        discogsStatus: r.status,
        discogsResponse: data,
      });
    }

    // Mapeo limpio para tu formulario
    const artist =
      data.artists && data.artists[0] && data.artists[0].name
        ? data.artists[0].name
        : "";

    const coverUrl =
      data.images &&
      data.images[0] &&
      (data.images[0].uri || data.images[0].resource_url)
        ? data.images[0].uri || data.images[0].resource_url
        : "";

    const genres = Array.isArray(data.genres) ? data.genres : [];
    const styles = Array.isArray(data.styles) ? data.styles : [];

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

    res.status(200).json({
      ok: true,
      // crudo útil por si luego quieres más campos
      id: data.id,
      title: data.title || "",
      artist,
      year: data.year || "",
      genres,
      styles,
      coverUrl,
      review,

      // útil para debug / UI
      country: data.country || "",
      labels: (data.labels || []).map((l) => l.name).slice(0, 5),
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err?.message || "Unknown error" });
  }
}
