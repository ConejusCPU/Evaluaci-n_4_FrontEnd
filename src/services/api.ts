import {Personaje} from "../types/Elemento.ts";

const BASE_URL = "https://dragonball-api.com/api/characters";

export async function obtenerPersonajes(): Promise<Personaje[]> {
  const respuesta = await fetch(`${BASE_URL}?limit=58`);

  if (!respuesta.ok) {
    throw new Error("No fue posible obtener los personajes");
  }

  const data = await respuesta.json();
  return data.items ?? data;
}