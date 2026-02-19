import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const API_URL = "https://spinsoul-json-server.onrender.com/releases";

function AddRecordPage() {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 nuevo

  const [form, setForm] = useState({
    title: "",
    artist: "",
    genre: "",
    year: "",
    coverUrl: "",
    rating: 0,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 👇 nuevo: prefill desde /releases/import
  useEffect(() => {
    if (!location.state) return;

    setForm((prev) => ({
      ...prev,
      ...location.state, // { title, artist, year, genre, coverUrl }
    }));

    // Limpia el state para que no se re-aplique al refrescar
    navigate(location.pathname, { replace: true, state: null });
  }, [location.state]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    const newRecord = {
      title: form.title.trim(),
      artist: form.artist.trim(),
      genre: form.genre.trim(),
      year: form.year ? Number(form.year) : null,
      coverUrl: form.coverUrl.trim(),
      rating: Number(form.rating) || 0,
    };

    try {
      setErrorMsg("");
      setIsSaving(true);

      await axios.post(API_URL, newRecord, {
        timeout: 15000,
      });

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
