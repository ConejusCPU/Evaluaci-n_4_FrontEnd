export interface Personaje {
  id: number;
  name: string;
  ki: string;
  race: string;
  affiliation: string;
  image: string;
  description: string;
}

//Local Storage
export interface FavoritoLocal extends Personaje {
  nota: string;
  agregadoEn: string;
}