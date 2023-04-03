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
          content={`Informacion sobre el pokemon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
        <meta property="og:title" content={`Info sobre el pokemon ${title}`} />
        <meta
          property="og:description"
          content={`Esta es la pagina que contiene informacion sobre ${title}`}
        />
        <meta
          property="og:image"
          content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png"
        />
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
