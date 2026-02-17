import  {useState, useEffect} from 'react';
import axios from 'axios'
import ReleaseCard from '../components/ReleaseCard';




function ReleasesListPage({query}) {
    const [releases, setReleases] = useState([]);

    useEffect(() => {  // hicimos un useEffect para ejecutar el código cuando el componente se monta
        axios.get ("http://localhost:5005/releases") // ponemos el url de la API que nos da el backend para traer los lanzamientos
        .then((response) => {
            setReleases(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
        
    }, []);

    const filteredReleases = releases.filter((release) =>
    release.title.toLowerCase().includes(query.toLowerCase())
  );

return (
    <div className="page">
      <div className="meta-row">
        <span>{filteredReleases.length} records</span>
      </div>

      <div className="grid">
        {filteredReleases.map((release) => (
          <ReleaseCard key={release.id} release={release} />
        ))}
      </div>
    </div>
)
}
export default ReleasesListPage;