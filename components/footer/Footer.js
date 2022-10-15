import {
  createStyles,
  Anchor,
  Group,
  Button,
  Stack,
  Text,
  Center,
  Box,
} from "@mantine/core";
import {
  IconArrowRightBar,
  IconBrandFacebook,
  IconFileText,
} from "@tabler/icons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  footer: {
    background: "#292929",
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    height: "193px",
    paddingTop: "20px",
  },

  link: {
    textDecoration: "none",
  },
}));

export default function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Stack align="center" sx={classes.inner}>
        <Anchor
          onClick={() => document.body.scrollIntoView({ behavior: "smooth" })}
        >
          Back to Top
        </Anchor>
        <Group>
          <Link href="/about">About Us</Link>

          <Link href="/contact">Contact Us</Link>

          <a href="#" className={classes.link}>
            <Center inline>
              <IconFileText size="46px" />
              <Box component="span">
                <Text size="20px">Ordering Form</Text>
              </Box>
            </Center>
          </a>

          <a
            href="https://www.facebook.com/upscaleprintingsolutions"
            className={classes.link}
          >
            <Center inline>
              <IconBrandFacebook size="46px" />
              <Box component="span">
                <Text size="20px">Facebook Page</Text>
              </Box>
            </Center>
          </a>
        </Group>
        <Text>(c) 2022 Upscale Printing Solutions...</Text>
      </Stack>
    </div>
  );
}
