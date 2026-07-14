import { Personaje } from "../types/Elemento";

interface Props {
  personaje: Personaje;
  onAgregar: (p: Personaje) => void;
}

export default function ElementoCard({ personaje, onAgregar }: Props) {
  return (
    <div className="card">
      <img
        src={personaje.image}
        alt={`Imagen de ${personaje.name}`}
        onError={(e) => (e.currentTarget.src = "/placeholder.png")}
      />
      <h3>{personaje.name}</h3>
      <p>Raza: {personaje.race || "Desconocida"}</p>
      <p>Afiliación: {personaje.affiliation || "N/A"}</p>
      <button onClick={() => onAgregar(personaje)}>Agregar a favoritos</button>
    </div>
  );
}