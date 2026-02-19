export default async function handler(req, res) {
  try {
    const token = process.env.DISCOGS_TOKEN;
    if (!token) return res.status(500).json({ ok: false, error: "Missing DISCOGS_TOKEN" });

    // Solo aceptamos GET
    if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });

    const q = (req.query?.q || "").toString().trim();
    if (!q) return res.status(400).json({ ok: false, error: "Missing query param: q" });

    const url = new URL("https://api.discogs.com/database/search");
    url.searchParams.set("q", q);
    url.searchParams.set("type", "release");
    url.searchParams.set("per_page", "10");

    const r = await fetch(url.toString(), {
      headers: {
        "User-Agent": "spinsoul/1.0",
        "Authorization": `Discogs token=${token}`,
        "Accept": "application/json",
      },
    });

    const data = await r.json();

    // Si Discogs devuelve error, lo pasamos claro
    if (!r.ok) {
      return res.status(r.status).json({
        ok: false,
        discogsStatus: r.status,
        discogsResponse: data,
      });
    }

    // Devolvemos solo lo necesario para la UI (más limpio)
    const results = (data.results || []).map((x) => ({
      id: x.id,
      title: x.title,          // suele venir "Artist - Release"
      year: x.year,
      country: x.country,
      genre: x.genre,
      cover_image: x.cover_image,
      resource_url: x.resource_url,
    }));

    res.status(200).json({ ok: true, q, results });
  } catch (err) {
    res.status(500).json({ ok: false, error: err?.message || "Unknown error" });
  }
}
