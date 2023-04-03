import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layouts";
import { Grid, Card, Text, Container, Image, Button } from "@nextui-org/react";
import { Pokemon, PokemonLimit } from "@/interfaces";
import { getPokemonInfo, localFavorites } from "@/utils";
import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isPokemonFavorite, setIsPokemonFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsPokemonFavorite(localFavorites.isFavorite(pokemon.id));
  }, []);

  const onClick = () => {
    localFavorites.localStorageFavorites(pokemon.id);
    setIsPokemonFavorite(!isPokemonFavorite);
    if (!isPokemonFavorite) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };
  return (
    <Layout title={`Pokemon - ${pokemon.name}`}>
      <Grid.Container
        css={{
          marginTop: "5px",
        }}
        gap={2}
      >
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "20px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "no-image.png"
                }
                alt={pokemon.name}
                width={"100%"}
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card isHoverable css={{ padding: "20px" }}>
            <Card.Header
              css={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button color="gradient" ghost onClick={onClick}>
                {isPokemonFavorite ? "Retirar de" : "Guardar en"} Favoritos
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const data: PokemonLimit[] = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  )
    .then((data) => data.json())
    .then((data) => data.results);

  const pokemons151: string[] = data.map((pokemon) => `${pokemon.name}`);

  return {
    paths: pokemons151.map((name) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name: paramName } = params as { name: string };
  const pokemon = await getPokemonInfo(paramName);
  return {
    props: {
      pokemon: pokemon,
    },
  };
};

export default PokemonByNamePage;
