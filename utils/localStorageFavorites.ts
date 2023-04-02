const localStorageFavorites = (id: number): void => {
  let favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  if (favorites.includes(id)) {
    favorites = favorites.filter((pokemonID) => pokemonID !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const isFavorite = (id: number): boolean => {
  if (typeof window === "undefined") return false;

  let favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  return favorites.includes(id);
};

const getFavoritePokemons = (): number[] => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export default { localStorageFavorites, isFavorite, getFavoritePokemons };
