import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextPage } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { Layout } from "@/components/layouts";
import { localFavorites } from "@/utils";
import { Pokemon } from "@/interfaces";
import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isPokemonFavorite, setIsPokemonFavorite] = useState<boolean>(
    localFavorites.isFavorite(pokemon.id)
  );

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
  const pokemons151: string[] = [...Array(150)].map(
    (el, index) => `${index + 1}`
  );

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const data: Pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  ).then((data) => data.json());

  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;
