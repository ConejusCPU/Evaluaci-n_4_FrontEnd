import type { Personaje } from "../types/Elemento";
import ElementoCard from "./ElementosCard";

interface ListaElementosProps {
  personajes: Personaje[];
  onAgregar: (personaje: Personaje) => void;
  onSeleccionar: (personaje: Personaje) => void;
  viewMode: "grid" | "list";
}

export default function ListaElementos({ personajes, onAgregar, onSeleccionar, viewMode }: ListaElementosProps) {
  return (
    <section className={`lista-elementos ${viewMode}`} aria-live="polite">
      {personajes.map((personaje) => (
        <ElementoCard
          key={personaje.id}
          personaje={personaje}
          onAgregar={onAgregar}
          onSeleccionar={onSeleccionar}
        />
      ))}
    </section>
  );
}
