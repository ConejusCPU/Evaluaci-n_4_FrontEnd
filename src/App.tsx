import { useEffect, useState } from "react";
import { obtenerPersonajes } from "./services/api";
import { Personaje, FavoritoLocal } from "./types/Elemento";
import Buscador from "./components/Buscador";
import ListaElementos from "./components/ListaElementos";
import Favoritos from "./components/Favoritos";

function App() {
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [favoritos, setFavoritos] = useState<FavoritoLocal[]>([]);

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

  const filtrados = personajes.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Explorador Dragon Ball</h1>
      <Buscador valor={busqueda} onCambiar={setBusqueda} />

      {cargando && <p>Cargando personajes...</p>}
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={cargarDatos}>Reintentar</button>
        </div>
      )}
      {!cargando && !error && filtrados.length === 0 && <p>Sin coincidencias.</p>}

      <ListaElementos personajes={filtrados} onAgregar={agregarFavorito} />
      <Favoritos
        favoritos={favoritos}
        onEliminar={eliminarFavorito}
        onActualizarNota={actualizarNota}
      />
    </div>
  );
}

export default App;