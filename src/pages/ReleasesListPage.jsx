// importamos useState y useEffect de react para poder usarlos en el componente (y axios para hacer las peticiones a la API) 
import  {useState, useEffect} from 'react';
import axios from 'axios'
import ReleaseCard from '../components/ReleaseCard'; // importamos el componente ReleaseCard para poder usarlo en el componente




function ReleasesListPage({query}) { // esta funcion recibe el query como prop
    const [releases, setReleases] = useState([]);

  useEffect(() => {  // hicimos un useEffect para ejecutar el código cuando el componente se monta
  axios.get("http://localhost:5005/releases")
    .then((response) => {  // hacemos la petición a la API para traer los lanzamientos y guardarlos en el estado
      setReleases(response.data);
    })
    .catch((error) => { // si tenemos un error, lo mostramos por console
      console.log(error);
    });
}, []);

const handleDelete = (id) => { // esta funcion recibe el id del lanzamiento que queremos eliminar en este caso en releases, hacemos una petición a la API para eliminar el lanzamiento de la base de datos y luego actualizamos el estado para eliminarlo de la lista de lanzamientos que se muestra en pantalla
  axios.delete(`http://localhost:5005/releases/${id}`)
    .then(() => {
      setReleases((prev) =>
        prev.filter((release) => release.id !== id)
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

// usamos el query para filtrar los lanzamientos por título
const filteredReleases = releases.filter((release) =>
  release.title.toLowerCase().includes(query.toLowerCase())
);




return ( // crea la estructura de la página
    <div className="page"> 
      <div className="meta-row">
        <span>{filteredReleases.length} records</span>
      </div>

      <div className="grid"> {/* usamos el componente ReleaseCard para mostrar los lanzamientos filtrados por título, y le pasamos la función handleDelete para que se pueda eliminar un lanzamiento desde la tarjeta en releases*/}
        {filteredReleases.map((release) => (
          <ReleaseCard key={release.id} release={release} onDelete={handleDelete}/>
        ))}
      </div>
    </div>
)
}
export default ReleasesListPage;


