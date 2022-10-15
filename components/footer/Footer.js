import {
  createStyles,
  Anchor,
  Group,
  Stack,
  Text,
  Center,
  Box,
} from "@mantine/core";
import { IconBrandFacebook, IconFileText } from "@tabler/icons";

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
    paddingTop: "24px",
  },

  links: {
    marginLeft: "10px",
    marginRight: "10px",
    textDecoration: "none",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    color: "#FFFFFF",
  },

  copyright: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    color: "#C1C1C1",
  },

  backtotop: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    color: "#FFFFFF",
  },
}));

export default function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Stack align="center" sx={classes.inner}>
        <Anchor
          className={classes.backtotop}
          onClick={() => document.body.scrollIntoView({ behavior: "smooth" })}
        >
          Back to Top
        </Anchor>
        <Group>
          <Anchor href="/about" className={classes.links}>
            <Center inline>
              <Box component="span">
                <Text>About Us</Text>
              </Box>
            </Center>
          </Anchor>

          <Anchor href="/contact" className={classes.links}>
            <Center inline>
              <Box component="span">
                <Text>Contact Us</Text>
              </Box>
            </Center>
          </Anchor>

          <Anchor href="/order" className={classes.links}>
            <Center inline>
              <IconFileText size="46px" color="#6f32be" />
              <Box component="span">
                <Text>Ordering Form</Text>
              </Box>
            </Center>
          </Anchor>

          <Anchor
            href="https://www.facebook.com/upscaleprintingsolutions"
            className={classes.links}
          >
            <Center inline>
              <IconBrandFacebook size="46px" color="#00abfb" />
              <Box component="span">
                <Text>Facebook Page</Text>
              </Box>
            </Center>
          </Anchor>
        </Group>
        <Text className={classes.copyright}>
          (c) 2022 Upscale Printing Solutions...
        </Text>
      </Stack>
    </div>
  );
}
