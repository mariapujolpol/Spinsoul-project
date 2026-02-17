import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddRecordPage() {

  const navigate = useNavigate();
  

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [cover, setCover] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      title: title,
      artist: artist,
      year: year,
      genre: genre
    };

    axios.post("http://localhost:5005/releases", newRecord)
      .then(() => {
        navigate("/releases");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Add Record</h1>

      <form onSubmit={handleSubmit}> {/* hacemos un form con un event listener para que cuando se haga submit, se ejecute la función handleSubmit*/}
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Artist:</label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>

        <div>
          <label>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div>
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        <div>
          <label>Cover:</label>
          <input
            type="text"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
          />
        </div>

        

        <button type="submit">Add Record</button>
      </form>
    </div>
  );
}

export default AddRecordPage;
