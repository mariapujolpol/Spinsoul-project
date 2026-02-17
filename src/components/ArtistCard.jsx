import { Link } from "react-router-dom";

export default function ArtistCard({ artist }) { //Recibimos el objeto artist como prop y lo usamos para mostrar la imagen, el nombre y el país del artista en la tarjeta.
  return (
    <Link to={`/artists/${artist.id}`} style={{ textDecoration: "none" }}> {/* Creamos un enlace a la página de detalles del artista pasando el id del artista en la URL */}
      <div className="card"> {/* Creamos la tarjeta con la imagen, el nombre y el país del artista */}
        <img className="cover" src={artist.imageUrl} alt={artist.name} /> {/* Mostramos la imagen del artista usando la propiedad imageUrl del objeto artist */}
        <div className="card-body"> {/* Creamos el cuerpo de la tarjeta con el nombre y el país del artista */}
          <h3 className="title">{artist.name}</h3> {/* Mostramos el nombre del artista usando la propiedad name del objeto artist */}
          <p className="subtitle">{artist.country}</p> {/* Mostramos el país del artista usando la propiedad country del objeto artist */}
        </div>
      </div>
    </Link>
  );
}


//Aqui importamos Link de react-router-dom y lo usamos para crear un enlace a la página de detalles del artista