export interface Personaje {
  id: number;
  name: string;
  ki: string;
  race: string;
  affiliation: string;
  image: string;
  category: string;
  status: string;
  description: string;
}

//Local Storage
export interface FavoritoLocal extends Personaje {
  nota: string;
  agregadoEn: string;
}