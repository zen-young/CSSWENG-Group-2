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

// TODO: Fetch the categories from Firebase instead of hardcoding it here.
const categories = [
  {
    title: "Business & Marketing",
    items: [
      "Placeholder 1",
      "Placeholder 2",
      "Placeholder 3",
      "Placeholder 4",
      "Placeholder 5",
    ],
  },
  {
    title: "Events",
    items: [
      "Placeholder 6",
      "Placeholder 7",
      "Placeholder 8",
      "Placeholder 9",
      "Placeholder 10",
      "Placeholder 11",
      "Placeholder 12",
    ],
  },
  {
    title: "Office & Stationery",
    items: ["Placeholder 13", "Placeholder 14", "Placeholder 15"],
  },
];

const products = [
  "Gift Tags",
  "Gift Wrapping Paper",
  "Notecards",
  "Notecards Again",
  "Some Random Stuff 1",
  "Some Random Stuff 2",
  "Some Random Stuff 3",
  "Some Random Stuff 4",
  "Photocards",
  "Sticker and Labels",
];

export default function NavBar() {
  const { classes, theme } = useStyles();

  // TODO: Extract this into another component
  const links = categories.map((category) => (
    <HoverCard
      width={400}
      position="right-start"
      shadow="md"
      withinPortal
      closeDelay={0}
      key={category.title}
    >
      <HoverCard.Target>
        <UnstyledButton className={classes.subLink}>
          <Group noWrap align="flex-start">
            <div>
              <Text size="sm" weight={500}>
                {category.title}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </HoverCard.Target>

      <HoverCard.Dropdown sx={{ overflow: "hidden" }}>
        <SimpleGrid cols={1} spacing={0}>
          {category.items.map((item) => (
            <a href={`/product/id/${item}`} key={item}>
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
                  <a href="#" className={classes.link}>
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
