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
  Divider,
} from "@mantine/core";
import { IconShoppingCart, IconSearch } from "@tabler/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : "#1f2937",
    fontWeight: 500,
    fontSize: theme.fontSizes.md,

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
      textDecoration: "underline",
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
    // top: 0,
    // width: "100%",
    // position: "fixed",
    zIndex: 50,
  },
}));

export default function NavBar() {
  const { classes, theme } = useStyles();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    try {
      getDocs(collection(db, "products"))
        .then((res) => {
          const productList = [];
          const categoryList = {};
          res.forEach((doc) => {
            const product = doc.data();
            if (
              product.hasOwnProperty("name") &&
              product.hasOwnProperty("image_urls") &&
              product.hasOwnProperty("product_id") &&
              product.hasOwnProperty("category") &&
              product.image_urls.length > 0
            ) {
              productList.push(doc.data());

              if (categoryList[product.category]) {
                categoryList[product.category].push({
                  name: product.name,
                  id: product.product_id,
                });
              } else {
                categoryList[product.category] = [
                  { name: product.name, id: product.product_id },
                ];
              }
            }
          });
          setProducts(productList);
          setCategories(categoryList);
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      const searchResult = products.filter((product) => {
        return product.name.toLowerCase().match(search.toLowerCase());
      });

      console.log(e, searchResult);

      if (searchResult.length < 1) {
        return;
      } else if (searchResult[0].name.length === search.length) {
        router.push(`/products/${searchResult[0].product_id}`);
      } else {
        setSearch(searchResult[0].name);
      }
    }
  };

  const links = [];
  Object.keys(categories).forEach((key) => {
    if (key === "") {
      return;
    }

    links.push(
      <HoverCard
        width={400}
        position="right-start"
        shadow="md"
        withinPortal
        closeDelay={20}
        key={key}
      >
        <HoverCard.Target>
          <a href={`/products?category=${key}`}>
            <UnstyledButton className={classes.subLink}>{key}</UnstyledButton>
          </a>
        </HoverCard.Target>

        <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
          <SimpleGrid cols={1} spacing={0}>
            {categories[key].map((item) => (
              <a href={`/products/${item.id}`} key={item.name}>
                <UnstyledButton className={classes.subLink}>
                  {item.name}
                </UnstyledButton>
              </a>
            ))}
          </SimpleGrid>
        </HoverCard.Dropdown>
      </HoverCard>
    );
  });

  return (
    <Box>
      <Header height={92} px="md" fixed={true} sx={classes.header}>
        <Group noWrap position="apart" sx={{ height: "100%" }}>
          <Group position="left">
            <Anchor href="/">
              <Image
                src="/assets/Company Logo.png"
                width="252px"
                height="80px"
                alt="company logo"
              />
            </Anchor>
            <Group
              sx={{ height: "60px", borderLeft: "1px solid #292929" }}
              spacing={0}
            >
              <HoverCard width={200} position="bottom" shadow="md" withinPortal>
                <HoverCard.Target>
                  <a className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        <Text size="md" weight="bold">
                          PRODUCTS
                        </Text>
                      </Box>
                      <i class="fa fa-caret-down" />
                    </Center>
                  </a>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                  <SimpleGrid cols={1} spacing={0}>
                    {links}
                    <Divider mb={10} />
                    <Link href="/products">
                      <a>
                        <UnstyledButton className={classes.subLink} width={400}>
                          View All Products
                        </UnstyledButton>
                      </a>
                    </Link>
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
              data={products.map((product) => {
                return product.name;
              })}
              onKeyDown={handleKeypress}
              onChange={(e) => {
                setSearch(e);
              }}
              value={search}
            />

            <Link href="/cart">
              <a className={classes.link}>
                <Center inline>
                  <IconShoppingCart size="46px" color="#292929" />
                  <Box component="span" mx={15}>
                    <Text size="md" weight="bold">
                      Your Cart:
                    </Text>
                    <Text size="md">{cart.length} items</Text>
                  </Box>
                </Center>
              </a>
            </Link>
          </Group>
        </Group>
      </Header>
    </Box>
  );
}
