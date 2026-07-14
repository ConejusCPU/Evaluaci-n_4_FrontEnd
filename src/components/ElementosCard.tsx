import type { Personaje } from "../types/Elemento";

interface Props {
  personaje: Personaje;
  onAgregar: (p: Personaje) => void;
  onSeleccionar: (p: Personaje) => void;
}

export default function ElementoCard({ personaje, onAgregar, onSeleccionar }: Props) {
  return (
    <article className="card">
      <img
        src={personaje.image}
        alt={`Foto de ${personaje.name}`}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = "/placeholder.png";
        }}
      />
      <div className="card-body">
        <h3>{personaje.name}</h3>
        <p className="meta">Categoría: <span>{personaje.category || "General"}</span></p>
        <p className="meta">Estado: <span>{personaje.status || "Desconocido"}</span></p>
        <p className="description">{personaje.description}</p>
        <div className="card-actions">
          <button className="button" type="button" onClick={() => onAgregar(personaje)}>
            Agregar a favoritos
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => onSeleccionar(personaje)}
          >
            Ver detalles
          </button>
        </div>
      </div>
    </article>
  );
}