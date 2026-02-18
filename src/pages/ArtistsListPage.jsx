import  {useState, useEffect} from 'react';
import axios from 'axios'
import ArtistCard from '../components/ArtistCard';
import ReleaseCard from '../components/ReleaseCard';





function ArtistsListPage() {
    const [artists, setArtists] = useState([]);

    useEffect(() => {  // hicimos un useEffect para ejecutar el código cuando el componente se monta
        axios.get ("https://spinsoul-json-server.onrender.com/artists") // ponemos el url de la API que nos da el backend para traer los artistas
        .then((response) => {
            setArtists(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
        
    }, []);
  
    const filteredArtists = artists.filter((artist) =>
    artist.title.toLowerCase().includes(query.toLowerCase())
  );

return (
    <div className="page">
      <div className="meta-row">
        <span>{artists.length} artists</span>
      </div>

      <div className="grid">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
)
}
export default ArtistsListPage;

// here we are using the useState to set the state of the component and
// the useEffect to fetch the data from the API and set the state of the component with the data we get from the API.
