import React from "react";
import { NextPage } from "next";
import { Layout } from "@/components/layouts";

const index: NextPage = () => {
  return (
    <Layout title="Pokemons Fvoritos">
      <h1>Lista de pokemons favoritos</h1>
    </Layout>
  );
};

export default index;
