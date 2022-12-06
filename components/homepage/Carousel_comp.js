import { React, useRef } from "react";

import { Carousel } from "@mantine/carousel";
import { createStyles } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import Link from "next/link";

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
    "&:hover": {
      backgroundColor: "rgba( 0, 0, 0, 0.50)",
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
  const options = {
    delay: 8000,
  };
  const autoplay = useRef(Autoplay(options));

  const images = [
    "/assets/sample_1.jpg",
    "/assets/sample_2.jpg",
    "/assets/sample_3.jpg",
  ];

  let slideList = images.map((item, index) => {
    let x = "Product " + index;
    return (
      <Carousel.Slide key={index}>
        <Link href="/">
          <a>
            <Image alt={x} src={item} layout="fill" objectFit="cover" />
          </a>
        </Link>
      </Carousel.Slide>
    );
  });

  const { classes } = useStyles();

  return (
    <>
      <Carousel
        slideSize="100%"
        height={800}
        slideGap="sm"
        controlsOffset="xs"
        nextControlIcon={<IconChevronRight size={50} color="white" />}
        previousControlIcon={<IconChevronLeft size={50} color="white" />}
        controlSize={50}
        withIndicators
        loop
        classNames={classes}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {slideList}
      </Carousel>
    </>
  );
}

export default Carousel_comp;
