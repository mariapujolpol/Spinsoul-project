import  {useState, useEffect} from 'react';
import axios from 'axios'
import ArtistCard from '../components/ArtistCard';
import ReleaseCard from '../components/ReleaseCard';




function ReleasesListPage() {
    const [releases, setReleases] = useState([]);

    useEffect(() => {  // hicimos un useEffect para ejecutar el código cuando el componente se monta
        axios.get ("http://localhost:5005/releases") // ponemos el url de la API que nos da el backend para traer los lanzamientos
        .then((response) => {
            setReleases(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
        
    }, []);

return (
    <div>
        <h1>All Releases</h1>
        
            {releases.map((release) => (
                <div key={release.id}>
                    <ReleaseCard release={release} />
                    <h3>{release.title}</h3>
                    <p>Artist: {release.artistId}</p>
                    <p>Year: {release.year}</p>
                </div>
            ))}
        
    </div>
)
}
export default ReleasesListPage;