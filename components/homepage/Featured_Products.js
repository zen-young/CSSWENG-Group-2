import React from 'react';

import H_Divider from './H_Divider';

import { Carousel } from "@mantine/carousel";
import { Text, Container, Group, Card, Image, SimpleGrid, createStyles} from '@mantine/core';

function Featured_Products() {

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

    let cardList = []
    for(let i = 0; i < productPics.length; i++){
        let alt = "Featured Product " + i;
        cardList.push(
            <Card
                component="a"
                href="/"
                shadow={"rgba(0, 0, 0, 0.24) 0px 5px 3px"}
                p="lg"
                withBorder
                className='hover:scale-[1.01]'
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
                    <Text 
                        align="center" 
                        weight={"700"} size="xl" 
                        className='hover:underline'

                    >
                        {productNames[i]}
                    </Text>
                </Group>
            </Card>
        );
    }

    const carouselPages = []
    for(let i = 0; i < 3; i++){
        carouselPages.push(
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

                styles={{
                    indicators:{
                        Button: {
                            backgroundColor: 'black'
                        }
                    },

                    indicator: {
                        width: 12,
                        height: 4,
                        transition: "width 250ms ease",

                        "&[data-active]": {
                            width: 40,
                        },
                    },
                }}
            >
                {carouselPages}
            </Carousel>
        </Container>
    );
}

export default Featured_Products;