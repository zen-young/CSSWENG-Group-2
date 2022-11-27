import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 24,
    textAlign: "center",
  },
}));

export default function ProductCardsGrid({ productList }) {
  const { classes } = useStyles();

  const cards = productList.map((product) => (
    <Card
      key={product.name}
      p="0"
      component="a"
      href={`/products/${product.product_id}`}
      className={classes.card}
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
    >
      <AspectRatio ratio={16 / 9}>
        <Image src={product.image_urls[0]} alt="product image" fit="contain" />
      </AspectRatio>
      <Text className={classes.title} m="md">
        {product.name}
      </Text>
    </Card>
  ));

  return (
    <Container py="xl" size="90%">
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}
