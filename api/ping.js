// This API route is a DEBUG / HEALTH CHECK endpoint
// It does NOT talk to Discogs.
// It only verifies that the server can access the environment variable.
//
// Useful when deploying:
// If this fails → your .env or hosting config is wrong
// If this works → Discogs problems are somewhere else

export default function handler(req, res) {

  // ------------------------------------------------------------
  // 1) Read environment variable from the server
  // Environment variables exist ONLY on the backend
  // The browser cannot access them directly
  // ------------------------------------------------------------
  const token = process.env.DISCOGS_TOKEN;

  // ------------------------------------------------------------
  // 2) Validate server configuration
  // If missing → deployment or .env.local problem
  // This is NOT a user error, it's a server setup error
  // ------------------------------------------------------------
  if (!token) {
    return res.status(500).json({ ok: false, message: "NO TOKEN FOUND" });
  }

  // ------------------------------------------------------------
  // 3) Return safe debug info
  // IMPORTANT: we DO NOT return the token itself (security risk)
  // Instead we return its length to confirm it exists
  // ------------------------------------------------------------
  res.status(200).json({
    ok: true,

    // proves token is loaded without exposing the secret
    tokenLength: token.length
  });
}