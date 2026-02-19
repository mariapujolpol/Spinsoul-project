import { useState } from "react";

function StarRating({ rating = 0, onChange }) { 
  const [hover, setHover] = useState(null); // estado para controlar el hover de las estrellas, inicialmente es null (ninguna estrella está siendo hoverada)

  const value = Number(rating) || 0; // el valor de rating se convierte a número, si no es un número se asigna 0

  return (
    <div className="stars">
      {[1,2,3,4,5].map((star) => {  // mapeamos un array de 1 a 5 para renderizar las estrellas y asignamos a cada estrella un número del 1 al 5
        const isActive = star <= (hover ?? value);

        return (
          <span // 
            key={star}
            style={{ cursor: onChange ? "pointer" : "default" }} // si se proporciona la función onChange, el cursor cambia a pointer para indicar que las estrellas son interactivas
            onClick={() => onChange && onChange(star)} // al hacer click en una estrella, se llama a la función onChange con el número de la estrella, si se proporciona la función onChange
            onMouseEnter={() => onChange && setHover(star)} // al hacer hover sobre estrella se cambia el estado hover
            onMouseLeave={() => onChange && setHover(null)} // al salir del hover se resetea el estado hover a null
          >
            {isActive ? "★" : "☆"}
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
