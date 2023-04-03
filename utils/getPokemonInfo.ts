import { Pokemon } from "@/interfaces";

export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const data: Pokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nameOrId}`
    ).then((data) => data.json());

    return { id: data.id, name: data.name, sprites: data.sprites };
  } catch (error) {
    return null;
  }
};
