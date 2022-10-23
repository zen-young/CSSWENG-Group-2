
import React from 'react';
import { Text, Container, Box, BackgroundImage, Overlay, Image, Grid, createStyles, CSSObject, Group } from "@mantine/core"
import H_Divider from './H_Divider';

const useStyles = createStyles((_theme) => ({

    root:{
        width: 275,
    },

    imageWrapper: {
        width: 275,
    },

    image: {
        width: 275,
    }

}))

function About_Us() {

    const aboutText = (CSSObject = {
        lineHeight: 'normal',
        textAlign: 'justify',
        color: "white",
        fontWeight: 400,
        fontSize: 24,
    });

    const aboutTitle = (CSSObject = {
        textAlign: 'center',
        color: 'white',
        fontWeight: 700,
        fontSize: 40,
    })

    const contactTitle = (CSSObject = {
        textAlign: "center",
        color: "black",
        fontWeight: 700,
        fontSize: 40,
        marginBottom: 0
    });

    const contactSubTitle = (CSSObject = {
        color: "black",
        fontWeight: 750,
        fontSize: 24,
    });

    const contactText = (CSSObject = {
        color: "black",
        fontWeight: 500,
        fontSize: 20,
        marginBottom: 15
    });

    return (
        <>
            <Box sx={{ position: "relative" }}>
                <Overlay opacity={0.8} color="#000" zIndex={-1} />
                <BackgroundImage src="/assets/about_bg.png">
                    <Container
                        zIndex={0}
                        sx={{ maxWidth: "85%" }}
                        mt={150}
                        py={50}
                    >
                        <Text sx={aboutTitle}>About Us</Text>

                        <H_Divider />

                        <Grid columns={20} gutter={200} align={"center"}>
                            <Grid.Col span={5}>
                                <Image
                                    alt="Company Logo"
                                    src="/assets/about_logo.png"
                                    width={270}
                                    layout="fill"
                                    fit="contain"
                                />
                            </Grid.Col>

                            <Grid.Col span={15}>
                                <Text sx={aboutText}>
                                    <span style={{ fontWeight: 650 }}>
                                        Upscale Printing Solutions{" "}
                                    </span>
                                    is a modest enterprise that has been in the
                                    industry for more than
                                    <span style={{ fontWeight: 650 }}>
                                        {" "}
                                        10 years.
                                    </span>{" "}
                                    It started as a small letterpress servicing
                                    businesses in the Metro East area. It
                                    eventually evolved as a commercial printer
                                    catering to different industries in and
                                    outside Metro Manila.
                                </Text>
                                <br />
                                <Text sx={aboutText}>
                                    Upscale Printing Solutions takes pride in
                                    being able to tap a wide spectrum of the
                                    market to service their offset and digital
                                    printing needs. With state of the art
                                    equipment, facilities and expertise, it
                                    provides a complete and cost effective
                                    printing solutions to its clients. Upscale
                                    Printing Solutions guarantees the highest
                                    quality of service from printing to
                                    finishing.
                                </Text>
                            </Grid.Col>
                        </Grid>
                    </Container>
                </BackgroundImage>
            </Box>

            <Container mt={100} sx={{ maxWidth: "80%" }}>
                <Text sx={contactTitle}>Contact Us</Text>

                <H_Divider />

                <Grid columns={10} pt={10} align={"center"} gutter={50}>
                    <Grid.Col span={4}>
                        <Image
                            alt="Google Maps"
                            src="/assets/map.png"
                            sx={{
                                border: "solid",
                                borderWidth: "2px",
                            }}
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Text sx={contactSubTitle}>Address</Text>
                        <Text sx={contactText}>
                            1056 Baltimore St., Brookside Hills Subdivision, San
                            Isidro, Cainta, Rizal
                        </Text>

                        <Text sx={contactSubTitle}>Service Hours</Text>
                        <Text sx={contactText}>Mon-Fri: TBA</Text>

                        <Text sx={contactSubTitle}>Contact No.</Text>
                        <Text sx={contactText}>
                            (+63) 917-5101023 / (+632) 8697-7968
                        </Text>

                        <Text sx={contactSubTitle}>E-mail Address</Text>
                        <Text sx={contactText}>upscale.printing@gmail.com</Text>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    );
}

export default About_Us;