import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005/releases";

function AddRecordPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    artist: "",
    genre: "",
    year: "",
    coverUrl: "",
    rating: 0, // optional if you want later
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecord = {
      title: form.title.trim(),
      artist: form.artist.trim(),
      genre: form.genre.trim(),
      year: form.year ? Number(form.year) : null,
      coverUrl: form.coverUrl.trim(),
      rating: Number(form.rating) || 0,
    };

    try {
      await axios.post(API_URL, newRecord);
      navigate("/releases");
    } catch (error) {
      console.log(error);
    }
  };

return (
  <div className="page">
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h1 className="modal-title">Add New Record</h1>

          <Link to="/releases" className="modal-close" aria-label="Close">
            ✕
          </Link>
        </div>

        <form className="form" onSubmit={handleSubmit}>
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
            />
          </div>

          <div className="actions">
            <Link className="btn-secondary" to="/releases">
              Cancel
            </Link>

            <button className="btn-primary" type="submit">
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}

export default AddRecordPage;
