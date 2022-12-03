import React, { useState } from "react";
import H_Divider from "./H_Divider";
import {
  Text,
  Container,
  Group,
  Card,
  Image,
  SimpleGrid,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 24,
    textAlign: "center",
  },
}));

function Featured_Products({ products }) {
  const [currPage, setCurrPage] = useState(0);

  const { classes } = useStyles();

  const chunkProductList = (arr, chunkSize) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArr.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArr;
  };

  const maxCardsPerPage = 6;
  const featured = chunkProductList(
    products.filter((product) => {
      return product.featured;
    }),
    maxCardsPerPage
  );
  const featurePages = featured.map((page) => {
    return (
      <>
        <SimpleGrid
          cols={3}
          verticalSpacing={50}
          spacing={50}
          sx={{ maxWidth: "100%" }}
        >
          {page.map((product, index) => {
            return (
              <Card
                component="a"
                href={`/products/${product.product_id}`}
                shadow={"rgba(0, 0, 0, 0.24) 0px 5px 3px"}
                p="lg"
                withBorder
                className={classes.card}
                
                key={index}
              >
                <Card.Section>
                  <Image
                    alt="featured pic"
                    src={product.image_urls[0]}
                    height={250}
                    layout="fill"
                  />
                </Card.Section>
                <Group position="center" mt={20}>
                  <Text
                    align="center"
                    weight={"700"}
                    size="xl"
                    className="hover:underline"
                  >
                    {product.name}
                  </Text>
                </Group>
              </Card>
            );
          })}
        </SimpleGrid>
      </>
    );
  });

  const numPages = featured.length;
  const paginationButtons = [];
  for (let i = 0; i < numPages; i++) {
    paginationButtons.push(
      <button
        className={`w-fit h-fit my-auto border-2 border-x-neutral-300 px-[7px] rounded-[5px] pb-[3px]
                    ${currPage == i ? "bg-neutral-400" : "bg-white"}
                    ${i == numPages - 1 ? "mr-[30px]" : "mr-[10px]"}`}
        onClick={() => setCurrPage(i)}
      >
        <span className="text-[10px] font-bold m-auto">{i + 1}</span>
      </button>
    );
  }

  return (
    <Container size="lg" style={{ marginTop: 130 }}>
      <Text align="center" weight={700} size={35}>
        Featured Products
      </Text>

      <H_Divider />

      <div className="h-[800px] mt-[50px] w-full">
        {featurePages[currPage]}

        <div className="flex mx-auto mt-[50px] justify-center">
          {paginationButtons}
          <a
            href="/products"
            className="my-auto font-bold text-[20px] hover:underline"
          >
            View All Products {">"}
          </a>
        </div>
      </div>
    </Container>
  );
}

export default Featured_Products;