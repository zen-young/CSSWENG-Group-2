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

function Featured_Products(props) {
  let tempProdPics = [
    "/assets/sample_1.jpg",
    "/assets/sample_2.jpg",
    "/assets/sample_3.jpg",
  ];

  let cardsList = [];

  let maxCardsPerPage = 6;
  let pages = [[], [], []];

  for (let i = 0; i < pages.length; i++) {
    for (let j = 0; j < maxCardsPerPage; j++) {
      let alt = "Featured Product " + j;
      pages[i].push(
        <Card
          component="a"
          href={`/products/Placeholder%20${(j + 1) * (i + 1)}`}
          shadow={"rgba(0, 0, 0, 0.24) 0px 5px 3px"}
          p="lg"
          withBorder
          className="hover:scale-[1.05]"
        >
          <Card.Section>
            <Image alt={alt} src={tempProdPics[i]} height={250} layout="fill" />
          </Card.Section>
          <Group position="center" mt={20}>
            <Text
              align="center"
              weight={"700"}
              size="xl"
              className="hover:underline"
            >
              Product in Page {i + 1}
            </Text>
          </Group>
        </Card>
      );
    }

    cardsList.push(
      <SimpleGrid
        cols={3}
        verticalSpacing={50}
        spacing={50}
        sx={{ maxWidth: "100%" }}
      >
        {pages[i]}
      </SimpleGrid>
    );
  }

  const [currPage, setCurrPage] = useState(0);
  let paginationButtons = [];

  for (let i = 0; i < props.numPages; i++) {
    paginationButtons.push(
      <button
        className={`w-fit h-fit my-auto border-2 border-x-neutral-300 px-[7px] rounded-[5px] 
                    ${currPage == i ? "bg-neutral-400" : "bg-white"}
                    ${i == props.numPages - 1 ? "mr-[30px]" : "mr-[10px]"}`}
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
        {cardsList[currPage]}

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
