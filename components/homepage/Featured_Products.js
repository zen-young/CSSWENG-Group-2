import React from 'react';

// import Image from 'next/image';
import H_Divider from './H_Divider';

import { Carousel } from "@mantine/carousel";
import { Text, Container, Group, Card, Image, SimpleGrid} from '@mantine/core';
// import { IconChevronLeft, IconChevronRight } from "@tabler/icons";

function Featured_Products() {

    const max_slides = 6;

    const productPics = [
        "sample_product_1.jpg",
        "sample_product_1.jpg",
        "sample_product_1.jpg",
        "sample_product_1.jpg",
        "sample_product_1.jpg",
        "sample_product_1.jpg",
    ];

    const productNames = [
        "Product Name 1",
        "Product Name 2",
        "Product Name 3",
        "Product Name 4",
        "Product Name 5",
        "Product Name 6",
    ];

    let cardList = productPics.map((item, index) => {
        let alt = 'Featured Product ' + index
        return (
            <Card
                component="a"
                href="/"
                shadow={"rgba(0, 0, 0, 0.24) 0px 5px 3px"}
                p="lg"
                withBorder
            >
                <Card.Section>
                    <Image
                        alt={alt}
                        src={"/assets/" + item}
                        height={250}
                        layout="fill"
                        objectFit="cover"
                    />
                </Card.Section>

                <Group position="center" mt={20}>
                    <Text 
                        align="center" 
                        weight={'700'} 
                        size="xl"
                        
                    >
                        {productNames[index]}
                    </Text>
                </Group>
            </Card>
        )
    });

    let cardList2 = []
    for(let i = 0; i < productPics.length; i++){
        let alt = "Featured Product " + i;
        cardList2.push(
            <Card
                component="a"
                href="/"
                shadow={"rgba(0, 0, 0, 0.24) 0px 5px 3px"}
                p="lg"
                withBorder
            >
                <Card.Section>
                    <Image
                        alt={alt}
                        src={"/assets/" + productPics[i]}
                        height={250}
                        layout="fill"
                        objectFit="cover"
                    />
                </Card.Section>

                <Group position="center" mt={20}>
                    <Text align="center" weight={"700"} size="xl">
                        {productNames[i]}
                    </Text>
                </Group>
            </Card>
        );
    }

    return (
        <Container size="lg" style={{ marginTop: 130 }}>
            <Text align="center" weight={700} size={35}>
                Featured Products
            </Text>

            <H_Divider />

            <Carousel
                slideSize="100%"
                height={800}
                slideGap="sm"

                withControls={false}
                withIndicators={true}
                loop
            >
                <Carousel.Slide>
                    <SimpleGrid
                        cols={3}
                        verticalSpacing={50}
                        spacing={50}
                        sx={{ maxWidth: "100%" }}
                    >
                        {cardList2}
                    </SimpleGrid>
                </Carousel.Slide>

                <Carousel.Slide>
                    <SimpleGrid
                        cols={3}
                        verticalSpacing={50}
                        spacing={50}
                        sx={{ maxWidth: "100%" }}
                    >
                        {cardList}
                    </SimpleGrid>
                </Carousel.Slide>
            </Carousel>
        </Container>
    );
}

export default Featured_Products;