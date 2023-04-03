import { SmallPokemon } from "@/interfaces";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { FC } from "react";
import { useRouter } from "next/router";

interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const { name, img, id } = pokemon;
  const router = useRouter();
  const onClick = () => {
    router.push(`/name/${name}`);
  };
  return (
    <Grid key={id} xs={6} sm={3} md={2} xl={1} onClick={onClick}>
      <Card isHoverable isPressable>
        <Card.Body>
          <Card.Image css={{ p: 1 }} src={img} width="100%" height={140} />
          <Card.Footer>
            <Row justify="space-between">
              <Text transform="capitalize">{name}</Text>
              <Text>#{id}</Text>
            </Row>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Grid>
  );
};
