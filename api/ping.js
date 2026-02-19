export default function handler(req, res) {
  const token = process.env.DISCOGS_TOKEN;

  if (!token) {
    return res.status(500).json({ ok: false, message: "NO TOKEN FOUND" });
  }

  res.status(200).json({
    ok: true,
    tokenLength: token.length
  });
}