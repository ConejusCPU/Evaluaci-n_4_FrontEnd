import { useEffect, useState } from "react";
import { obtenerPersonajes } from "./services/api";
import type { Personaje, FavoritoLocal } from "./types/Elemento";
import Buscador from "./components/Buscador";
import ListaElementos from "./components/ListaElementos";
import Favoritos from "./components/Favoritos";
import "./App.css";

function App() {
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState<FavoritoLocal[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPersonaje, setSelectedPersonaje] = useState<Personaje | null>(null);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError("");
      const data = await obtenerPersonajes();
      setPersonajes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Cargar favoritos guardados
  useEffect(() => {
    const guardados = localStorage.getItem("favoritos");
    if (guardados) setFavoritos(JSON.parse(guardados));
  }, []);

  // Sincronizar favoritos con localStorage
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const agregarFavorito = (p: Personaje) => {
    const yaExiste = favoritos.some((f) => f.id === p.id);
    if (yaExiste) return; // evita duplicados
    setFavoritos([...favoritos, { ...p, nota: "", agregadoEn: new Date().toISOString() }]);
  };

  const eliminarFavorito = (id: number) => {
    setFavoritos(favoritos.filter((f) => f.id !== id));
  };

  const actualizarNota = (id: number, nota: string) => {
    setFavoritos(favoritos.map((f) => (f.id === id ? { ...f, nota } : f)));
  };

  const seleccionarPersonaje = (personaje: Personaje) => {
    setSelectedPersonaje(personaje);
  };

  const filtrados = personajes.filter((personaje) =>
    personaje.name.toLowerCase().includes(busqueda.toLowerCase()) ||
    personaje.category.toLowerCase().includes(busqueda.toLowerCase()) ||
    personaje.status.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">Dragon Ball API</p>
          <h1>Explorador de personajes</h1>
          <p className="descripcion">
            Busca personajes por nombre, categoría o estado y guarda favoritos con notas.
          </p>
        </div>

        <div className="view-controls" role="group" aria-label="Modo de vista">
          <button
            type="button"
            className={viewMode === "grid" ? "active" : ""}
            onClick={() => setViewMode("grid")}
          >
            Tarjetas
          </button>
          <button
            type="button"
            className={viewMode === "list" ? "active" : ""}
            onClick={() => setViewMode("list")}
          >
            Lista
          </button>
        </div>
      </header>

      <Buscador valor={busqueda} onCambiar={setBusqueda} />

      <div className="status-bar">
        {cargando && <p className="info" role="status">Cargando personajes...</p>}
        {error && (
          <div className="error-panel" role="alert">
            <p>{error}</p>
            <button className="button button-secondary" onClick={cargarDatos}>
              Reintentar
            </button>
          </div>
        )}
        {!cargando && !error && filtrados.length === 0 && (
          <p className="info">No se encontraron coincidencias.</p>
        )}
      </div>

      {selectedPersonaje && (
        <section className="detalle-personaje" aria-live="polite">
          <div className="detalle-header">
            <h2>Detalles de {selectedPersonaje.name}</h2>
            <button className="button button-secondary" type="button" onClick={() => setSelectedPersonaje(null)}>
              Cerrar detalles
            </button>
          </div>
          <div className="detalle-grid">
            <img src={selectedPersonaje.image} alt={`Foto de ${selectedPersonaje.name}`} />
            <div>
              <p className="meta"><strong>Categoría:</strong> {selectedPersonaje.category}</p>
              <p className="meta"><strong>Estado:</strong> {selectedPersonaje.status}</p>
              <p className="meta"><strong>Raza:</strong> {selectedPersonaje.race}</p>
              <p className="meta"><strong>Afiliación:</strong> {selectedPersonaje.affiliation}</p>
              <p className="meta"><strong>Potencia / Ki:</strong> {selectedPersonaje.ki}</p>
              <p className="description">{selectedPersonaje.description}</p>
            </div>
          </div>
        </section>
      )}

      {!error && !cargando && filtrados.length > 0 && (
        <ListaElementos
          personajes={filtrados}
          onAgregar={agregarFavorito}
          onSeleccionar={seleccionarPersonaje}
          viewMode={viewMode}
        />
      )}
      <Favoritos
        favoritos={favoritos}
        onEliminar={eliminarFavorito}
        onActualizarNota={actualizarNota}
      />
    </div>
  );
}

export default App;