import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Backend endpoint where new releases are stored
// NOTE: should evaluate to something like: http://localhost:5005/releases
const API_URL = "`${import.meta.env.VITE_SERVER_URL}`/releases";

function AddRecordPage() {
  // Router navigation (after saving)
  const navigate = useNavigate();

  // Access router state (data passed from ImportDiscogsPage)
  const location = useLocation();

  // ------------------------------------------------------------
  // FORM STATE (single object = easier updates)
  // This holds the editable values of the form
  // ------------------------------------------------------------
  const [form, setForm] = useState({
    title: "",
    artist: "",
    genre: "",
    year: "",
    coverUrl: "",
    rating: 0,
    review: "",
  });

  // UI feedback states
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ------------------------------------------------------------
  // PREFILL FROM IMPORT PAGE
  // When navigating from /releases/import we receive data via:
  // navigate("/releases/new", { state: mapped })
  // ------------------------------------------------------------
  useEffect(() => {
    // If user opened page normally → no prefill
    if (!location.state) return;

    // Merge imported data into the form
    setForm((prev) => ({
      ...prev,
      ...location.state, // { title, artist, year, genre, coverUrl, review }
    }));

    // IMPORTANT:
    // Clear router state so refresh doesn't reapply import
    navigate(location.pathname, { replace: true, state: null });
  }, [location.state]); // eslint-disable-line react-hooks/exhaustive-deps

  // ------------------------------------------------------------
  // INPUT HANDLER (generic)
  // Works for all text inputs using name attribute
  // ------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ------------------------------------------------------------
  // SUBMIT HANDLER
  // Sends the cleaned record to backend
  // ------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submit clicks
    if (isSaving) return;

    // Normalize data before sending
    const newRecord = {
      title: form.title.trim(),
      artist: form.artist.trim(),
      genre: form.genre.trim(),

      // Convert year to number (or null)
      year: form.year ? Number(form.year) : null,

      coverUrl: form.coverUrl.trim(),

      // Ensure rating is numeric
      rating: Number(form.rating) || 0,

      review: form.review.trim(),
    };

    try {
      setErrorMsg("");
      setIsSaving(true);

      // Send POST request to backend
      await axios.post(API_URL, newRecord, {
        timeout: 15000,
      });

      // After saving → go back to releases list
      navigate("/releases");
    } catch (error) {
      console.log(error);
      setErrorMsg("Couldn’t save the record. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="page">
      <div className="modal-backdrop">
        <div className="modal">
          <div className="modal-header">
            <h1 className="modal-title">Add New Record</h1>

            <Link
              to={isSaving ? "#" : "/releases"}
              className={`modal-close ${isSaving ? "is-disabled" : ""}`}
              onClick={(e) => {
                if (isSaving) e.preventDefault();
              }}
              aria-label="Close"
            >
              ✕
            </Link>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/releases/import")}
                disabled={isSaving}
                style={{ width: "100%" }}
              >
                Import from Discogs
              </button>
            </div>
            {errorMsg && (
              <div style={{ marginBottom: 12, opacity: 0.85 }}>{errorMsg}</div>
            )}

            <div className="field">
              <label className="label">
                Title <span className="required">*</span>
              </label>
              <input
                className="input"
                name="title"
                type="text"
                placeholder="Album title"
                value={form.title}
                onChange={handleChange}
                required
                disabled={isSaving}
              />
            </div>

            <div className="field">
              <label className="label">
                Artist <span className="required">*</span>
              </label>
              <input
                className="input"
                name="artist"
                type="text"
                placeholder="Artist name"
                value={form.artist}
                onChange={handleChange}
                required
                disabled={isSaving}
              />
            </div>

            <div className="grid-2">
              <div className="field">
                <label className="label">Genre</label>
                <input
                  className="input"
                  name="genre"
                  type="text"
                  placeholder="e.g. Soul, Jazz"
                  value={form.genre}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>

              <div className="field">
                <label className="label">Year</label>
                <input
                  className="input"
                  name="year"
                  type="number"
                  placeholder="2024"
                  min="1900"
                  max="2100"
                  value={form.year}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Cover Image URL</label>
              <input
                className="input"
                name="coverUrl"
                type="url"
                placeholder="https://..."
                value={form.coverUrl}
                onChange={handleChange}
                disabled={isSaving}
              />
            </div>
            <div className="field">
              <label className="label">Description</label>
              <textarea
                className="input"
                name="review"
                placeholder="Short description..."
                value={form.review}
                onChange={handleChange}
                disabled={isSaving}
                rows={3}
              />
            </div>

            <div className="actions">
              <Link
                className={`btn-secondary ${isSaving ? "is-disabled" : ""}`}
                to={isSaving ? "#" : "/releases"}
                onClick={(e) => {
                  if (isSaving) e.preventDefault();
                }}
              >
                Cancel
              </Link>

              <button className="btn-primary" type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <span className="spinner-sm" />
                    Saving...
                  </>
                ) : (
                  "Add Record"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddRecordPage;
