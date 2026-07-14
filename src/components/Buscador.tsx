interface BuscadorProps {
  valor: string;
  onCambiar: (valor: string) => void;
}

export default function Buscador({ valor, onCambiar }: BuscadorProps) {
  return (
    <form className="buscador" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="busqueda">Buscar personaje</label>
      <input
        id="busqueda"
        name="busqueda"
        type="search"
        value={valor}
        onChange={(event) => onCambiar(event.target.value)}
        placeholder="Nombre, categoría o estado"
        autoComplete="off"
      />
    </form>
  );
}
