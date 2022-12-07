
import React, { useEffect, useState } from 'react';
import { Text, Container, Box, BackgroundImage, Overlay, Image, Grid, createStyles, CSSObject, Group } from "@mantine/core"
import H_Divider from './H_Divider';

import { db } from '../../firebaseConfig'
import { getDoc, doc } from 'firebase/firestore';

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

    const [address, setAddress] = useState("")
    const [contactNum, setContactNum] = useState("")
    const [email, setEmail] = useState("")
    const [serviceHRS, setServiceHRS] = useState("")
    const [companyDesc, setDesc] = useState("")
    const [logo, setLogo] = useState("")


    function getData(){
        getDoc(doc(db, "website_information", "contact_information")).then((res) => {
            var data = res.data()
            setAddress(data.company_address)
            setContactNum(data.contact_number)
            setEmail(data.email)
            setServiceHRS(data.service_hours)

            getDoc(doc(db, "website_information", "company_information")).then((newRes) => {
                var newData = newRes.data()
                setDesc(newData.company_description)
                setLogo(newData.company_logo)
            })
        })
    }

    useEffect(() => {
        getData()
        if(companyDesc){
            document.getElementById("company_description").innerHTML = companyDesc;
        }
    }, [companyDesc])

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
                                    src={logo}
                                    width={270}
                                    layout="fill"
                                    fit="contain"
                                />
                            </Grid.Col>

                            <Grid.Col span={15}>
                                <div className='text-white text-[22px]' id='company_description' />
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
                        <Text sx={contactText}>{address}</Text>

                        <Text sx={contactSubTitle}>Service Hours</Text>
                        <Text sx={contactText}>{serviceHRS}</Text>

                        <Text sx={contactSubTitle}>Contact No.</Text>
                        <Text sx={contactText}>{contactNum}</Text>

                        <Text sx={contactSubTitle}>E-mail Address</Text>
                        <Text sx={contactText}>{email}</Text>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    );
}

export default About_Us;