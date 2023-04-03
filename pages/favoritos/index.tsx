import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { Layout } from "@/components/layouts";
import { NoFavorites } from "@/components/ui/";
import { localFavorites } from "@/utils";
import { FavoritePokemons } from "@/components/pokemon/FavoritePokemons";

const FavoritesPage: NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(() => localFavorites.getFavoritePokemons());
  }, []);

  return (
    <Layout title="Pokemons Favoritos">
      {!favoritePokemons.length ? (
        <NoFavorites />
      ) : (
        <FavoritePokemons favoritePokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
