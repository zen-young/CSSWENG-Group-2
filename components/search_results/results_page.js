import React from "react";

import { IconSearch } from "@tabler/icons";
import { SimpleGrid, Card, Group, Image, Text } from "@mantine/core";
import H_Divider from "../homepage/H_Divider";

function Results_Page() {
  const text = "Notepad";
  const maxCols = 3;

  const card = (
    <Card
      component="a"
      href="/products/Notepad"
      shadow={"rgba(0, 0, 0, 0.24) 0px 5px 3px"}
      p="lg"
      withBorder
      className="hover:scale-[1.01]"
    >
      <Card.Section>
        <Image
          alt={"Sample Product 1"}
          src={"/assets/sample_product_1.jpg"}
          height={300}
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
          {text}
        </Text>
      </Group>
    </Card>
  );

  let resultsList = [card, card, card];

  return (
    <>
      <div className="flex w-full h-[100px] border-black border-b">
        <div className="flex my-auto ml-[50px]">
          <IconSearch size={50} stroke={3.5} />
          <p className="h-fit my-auto ml-[20px] text-[24px] font-bold">
            Search Results for &quot;{text}&quot;
          </p>
        </div>
      </div>

      <div className="flex w-full px-[100px] py-[50px]">
        <SimpleGrid
          cols={maxCols}
          verticalSpacing={50}
          spacing={100}
          sx={{ maxWidth: "100%" }}
        >
          {resultsList}
        </SimpleGrid>
      </div>

      <div className="flex-row content-center text-center">
        <div className="w-full mt-[50px]">
          <H_Divider />
        </div>
        <p className="text-[20px]">
          Can&apos;t find what you&apos;re looking for? Contact us on Viber!
        </p>
        <p className="text-[20px]">
          at <span className="font-bold">+63 917-510-1023</span>
        </p>
      </div>
    </>
  );
}

export default Results_Page;
