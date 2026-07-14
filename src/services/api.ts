import type { Personaje } from "../types/Elemento.ts";

const BASE_URL = "https://dragonball-api.com/api/characters";

type RawPersonaje = {
  id?: number | string;
  name?: string;
  fullName?: string;
  ki?: string | number;
  powerLevel?: string | number;
  race?: string;
  species?: string;
  affiliation?: string;
  group?: string;
  status?: string;
  isAlive?: boolean;
  image?: string;
  images?: { portrait?: string; small?: string };
  description?: string;
  bio?: string;
  category?: string;
};

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23f2f2f2'/%3E%3Ctext x='50%25' y='50%25' fill='%23707070' font-size='26' font-family='Arial, sans-serif' dominant-baseline='middle' text-anchor='middle'%3ESin imagen%3C/text%3E%3C/svg%3E";

export async function obtenerPersonajes(): Promise<Personaje[]> {
  const respuesta = await fetch(`${BASE_URL}?limit=58`);

  if (!respuesta.ok) {
    throw new Error("No fue posible obtener los personajes");
  }

  const data = await respuesta.json();
  const items: RawPersonaje[] = Array.isArray(data.items)
    ? data.items
    : Array.isArray(data)
    ? data
    : [];

  return items.map((item, index) => {
    const statusValue =
      item.status ||
      (item.isAlive === false ? "Muerto" : item.isAlive === true ? "Vivo" : "Desconocido");

    const imageUrl =
      item.image || item.images?.portrait || item.images?.small || PLACEHOLDER_IMAGE;

    return {
      id: Number(item.id ?? index + 1) || index + 1,
      name: item.name ?? item.fullName ?? "Sin nombre",
      ki: String(item.ki ?? item.powerLevel ?? "Desconocido"),
      race: item.race ?? item.species ?? "Desconocida",
      affiliation: item.affiliation ?? item.group ?? "N/A",
      image: imageUrl,
      description: item.description ?? item.bio ?? "No hay descripción disponible.",
      category: item.category ?? item.affiliation ?? item.race ?? "General",
      status: statusValue,
    };
  });
}