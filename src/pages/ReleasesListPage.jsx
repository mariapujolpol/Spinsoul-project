// importamos useState y useEffect de react para poder usarlos en el componente (y axios para hacer las peticiones a la API)
import { useState, useEffect } from "react";
import axios from "axios";
import ReleaseCard from "../components/ReleaseCard"; // importamos el componente ReleaseCard para poder usarlo en el componente
import LoadingOverlay from "../components/LoadingOverlay"; // importamos el componente LoadingOverlay para mostrar un mensaje de carga mientras se cargan los datos

function ReleasesListPage({ query = "" }) { // esta funcion recibe el query como prop
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadReleases = async () => {
      try {
        setLoading(true);
        const response = await axios.get( `${import.meta.env.VITE_SERVER_URL}/releases"`
        );

        if (mounted) {
          setReleases(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadReleases();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <LoadingOverlay text="Loading records..." />;

  const handleDelete = (id) => { // esta funcion recibe el id del lanzamiento que queremos eliminar
    axios
      .delete(`${import.meta.env.VITE_SERVER_URL}/releases/${id}`)
      .then(() => {
        setReleases((prev) => prev.filter((release) => release.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // usamos el query para filtrar los lanzamientos por título
  const filteredReleases = releases.filter((release) =>
    release.title.toLowerCase().includes(query.toLowerCase())
  );

  return ( // crea la estructura de la página
    <div className="page">
      <div className="meta-row">
        <span>{filteredReleases.length} records</span>
      </div>

      <div className="grid">
        {filteredReleases.map((release) => (
          <ReleaseCard
            key={release.id}
            release={release}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ReleasesListPage;

