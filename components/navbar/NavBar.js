import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {
  createStyles,
  Header,
  HoverCard,
  Group,
  UnstyledButton,
  Text,
  SimpleGrid,
  Anchor,
  Center,
  Box,
  Autocomplete,
} from "@mantine/core";
import { IconFileText, IconSearch } from "@tabler/icons";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  search: {
    width: "404px",
    height: "32px",
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px",
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  header: {
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.25)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
    background: "#FFFFFF",
  },
}));

export default function NavBar() {
  const { classes, theme } = useStyles();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      // get products
      getDocs(collection(db, "products"))
        .then((res) => {
          const productList = [];
          res.forEach((doc) => {
            productList.push(doc.data().name);
          });
          setProducts(productList);
        })
        .catch((err) => console.error(err));

      // get categories
      getDocs(collection(db, "categories"))
        .then((res) => {
          const categoriesList = [];
          res.forEach((doc) => {
            categoriesList.push(doc.data());
          });
          setCategories(categoriesList);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  }, []);

  console.log(products);
  console.log(categories);

  // TODO: Extract this into another component
  const links = categories.map((category) => (
    <HoverCard
      width={400}
      position="right-start"
      shadow="md"
      withinPortal
      closeDelay={0}
      key={category.name}
    >
      <HoverCard.Target>
        <UnstyledButton className={classes.subLink}>
          <Group noWrap align="flex-start">
            <div>
              <Text size="sm" weight={500}>
                {category.name}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </HoverCard.Target>

      <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
        <SimpleGrid cols={1} spacing={0}>
          {category.products.map((item) => (
            <a href={`/products/${item}`} key={item}>
              <UnstyledButton className={classes.subLink}>
                {item}
              </UnstyledButton>
            </a>
          ))}
        </SimpleGrid>
      </HoverCard.Dropdown>
    </HoverCard>
  ));

  return (
    <Box sx={classes.header}>
      <Header height={92} px="md">
        <Group noWrap position="apart" sx={{ height: "100%" }}>
          <Group position="left">
            <Anchor href="/">
              <Image
                src="/../public/assets/Company Logo.png"
                width="251px"
                height="70px"
                alt="company logo"
              />
            </Anchor>
            <Group
              sx={{ height: "60px", borderLeft: "1px solid #000000" }}
              spacing={0}
            >
              <HoverCard width={200} position="bottom" shadow="md" withinPortal>
                <HoverCard.Target>
                  <a href="/products" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        <Text size="md" underline="true" weight="bold">
                          PRODUCTS
                        </Text>
                      </Box>
                      <Image
                        src="/../public/assets/material-symbols_arrow-drop-down-rounded.png"
                        width="33"
                        height="33"
                        alt="down arrow"
                      />
                    </Center>
                  </a>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                  <SimpleGrid cols={1} spacing={0}>
                    {links}
                  </SimpleGrid>
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>
          </Group>

          <Group>
            <Autocomplete
              className={classes.search}
              placeholder="Search Products"
              icon={<IconSearch size={16} stroke={1.5} />}
              transition="pop-top-left"
              transitionDuration={80}
              transitionTimingFunction="ease"
              shadow="md"
              data={products}
            />

            <a href="#" className={classes.link}>
              <Center inline>
                <IconFileText size="46px" color={theme.fn.primaryColor()} />
                <Box component="span" mr={5}>
                  <Text size="md" weight="bold">
                    ORDER NOW!
                  </Text>
                </Box>
              </Center>
            </a>
          </Group>
        </Group>
      </Header>
    </Box>
  );
}
