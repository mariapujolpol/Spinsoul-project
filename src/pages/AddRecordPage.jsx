import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AddRecordPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState(""); // lo dejamos por ahora
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [cover, setCover] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      title,
      artist, // ojo: esto no lo usa tu relación, pero lo dejamos si lo quieres mostrar después
      year: Number(year) || null,
      genre,
      coverUrl: cover || "/images/covers/placeholder.jpg",
      rating: 3,
      review: ""
    };

    axios
      .post("http://localhost:5005/releases", newRecord)
      .then(() => navigate("/releases"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="page">
      <div className="form-header">
        <h1 className="form-title">Add New Record</h1>
        <Link className="btn-secondary link-reset" to="/releases">
          ← Back
        </Link>
      </div>

      <div className="form-card">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <Field label="Title" value={title} onChange={setTitle} placeholder="Discovery" />
            <Field label="Artist (for now)" value={artist} onChange={setArtist} placeholder="Daft Punk" />
            <Field label="Year" type="number" value={year} onChange={setYear} placeholder="2001" />
            <Field label="Genre" value={genre} onChange={setGenre} placeholder="Electronic" />
            <Field label="Cover URL" value={cover} onChange={setCover} placeholder="/images/covers/discovery.jpg" />
          </div>

          <div className="form-actions">
            <button className="btn" type="submit">
              ＋ Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <input
        className="field-input"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default AddRecordPage;
