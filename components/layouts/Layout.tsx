import { ReactNode } from "react";
import Head from "next/head";
import { NavBar } from "../ui";

interface Props {
  children: ReactNode;
  title?: string;
}

export const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title || "PokemonApp"}</title>
        <meta name="name" content="Juan Bohorquez" />
        <meta
          name="description"
          content={`informacion sobre el pokemon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>
      <NavBar />
      <main
        style={{
          padding: "3%",
        }}
      >
        {children}
      </main>
    </>
  );
};
