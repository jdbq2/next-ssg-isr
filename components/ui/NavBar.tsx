import { Container, Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const NavBar = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "5px 20px",
        backgroundColor: theme?.colors.gray50.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
        alt="icono de la aplicacion"
        width={50}
        height={50}
      />
      <Link href={"/"}>
        <Container display="flex" direction="row" alignItems="center">
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okemon
          </Text>
        </Container>
      </Link>
      <Spacer css={{ flex: 1 }} />
      <Link href={"/favoritos"}>
        <Text color="white"> Favoritos</Text>
      </Link>
    </div>
  );
};
