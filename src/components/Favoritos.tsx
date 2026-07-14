import type { FavoritoLocal } from "../types/Elemento";

interface FavoritosProps {
  favoritos: FavoritoLocal[];
  onEliminar: (id: number) => void;
  onActualizarNota: (id: number, nota: string) => void;
}

export default function Favoritos({ favoritos, onEliminar, onActualizarNota }: FavoritosProps) {
  return (
    <section className="favoritos">
      <h2>Favoritos guardados</h2>
      {favoritos.length === 0 ? (
        <p className="info">No tienes favoritos aún. Agrega uno desde la lista de personajes.</p>
      ) : (
        <div className="favoritos-grid">
          {favoritos.map((favorito) => (
            <article key={favorito.id} className="favorite-card">
              <div className="favorite-header">
                <div>
                  <h3>{favorito.name}</h3>
                  <p className="small">Categoría: {favorito.category}</p>
                  <p className="small">Estado: {favorito.status}</p>
                </div>
                <button className="button button-secondary" type="button" onClick={() => onEliminar(favorito.id)}>
                  Eliminar
                </button>
              </div>

              <label htmlFor={`nota-${favorito.id}`}>Nota personal</label>
              <textarea
                id={`nota-${favorito.id}`}
                value={favorito.nota}
                onChange={(event) => onActualizarNota(favorito.id, event.target.value)}
                placeholder="Escribe una nota o estado personal"
              />
              <p className="small">Guardado: {new Date(favorito.agregadoEn).toLocaleDateString()}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
