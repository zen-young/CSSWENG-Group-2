import React from 'react';

import { Carousel } from "@mantine/carousel";
import { createStyles } from '@mantine/core';

import Image from 'next/image';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';

const useStyles = createStyles((_theme, _params, getRef) => ({
    controls: {
        ref: getRef("controls"),
        transition: "opacity 150ms ease",
        opacity: 0,
    },

    control: {
        backgroundColor: "rgba( 0, 0, 0, 0)",
        borderColor: "rgba( 0, 0, 0, 0)",
        borderRadius: 10,
        height: 100,
        "&:hover": {
            backgroundColor: "rgba( 0, 0, 0, 0.20)",
        },
    },

    root: {
        "&:hover": {
            [`& .${getRef("controls")}`]: {
                opacity: 1,
            },
        },
    },
}));

function Carousel_comp() {

    const images = [
        "/assets/sample_1.jpg",
        "/assets/sample_2.jpg",
        "/assets/sample_3.jpg",
    ];

    let slideList = images.map((item, index) => {
        let x = "Product " + index;
        return (
            <Carousel.Slide key={index}>
                <Image
                    alt={x}
                    src={item}
                    layout="fill"
                    objectFit="cover"
                />
            </Carousel.Slide>
        );
    });

    const {classes} = useStyles();

    return (
        <>
            <Carousel
                // sx={{ flex: 1 }}
                slideSize="100%"
                height={800}
                
                slideGap="sm"
                controlsOffset="xs"

                nextControlIcon={<IconChevronRight size={50} color='white' />}
                previousControlIcon={<IconChevronLeft size={50} color='white' />}

                controlSize={50}
                withIndicators
                loop

                classNames={classes}
            >
                {slideList}
            </Carousel>
        </>
    );
}

export default Carousel_comp;