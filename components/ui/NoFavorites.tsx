import React from "react";
import { Container, Text } from "@nextui-org/react";
import Image from "next/image";

export const NoFavorites = () => {
  return (
    <Container
      css={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 100px)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text h1>No hay Favoritos</Text>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
        alt="no pokemons image"
        width={100}
        height={100}
      />
    </Container>
  );
};
