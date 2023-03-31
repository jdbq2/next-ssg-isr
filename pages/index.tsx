import { NextPage, GetStaticProps } from "next";
import { Layout } from "@/components/layouts";
import { pokeApi } from "@/api";
import { PokemonList, SmallPokemon } from "@/interfaces";
import { Grid } from "@nextui-org/react";
import { PokemonCard } from "@/components/pokemon/PokemonCard";

interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <>
      <Layout title="Listado de Pokemons">
        <Grid.Container gap={2} justify="flex-start">
          {pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))}
        </Grid.Container>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonList>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => {
    return {
      ...pokemon,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`,
      id: index + 1,
    };
  });

  return {
    props: {
      pokemons,
    },
  };
};

export default Home;
