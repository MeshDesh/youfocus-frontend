import { Box, Container, Grid, Heading, SimpleGrid, Text, useColorMode, useColorModeValue } from "@chakra-ui/react"
import React from "react"
import GuyInChairImg from "../../assets/chair_guy.svg"
import PlayerImg from "../../assets/player.svg"
import ModeImg from "../../assets/mode.svg"

import "./feature.scss"

const Features: React.FC = () => {

    const featureCardTheme = {
        bg: useColorModeValue('#EDF2F7','#2D3748'),
        text: useColorModeValue('#171923', '#E2E8F0')
    }

    return (
        <Container maxW="container.xl" className='feature_container'>
            <Heading className='feature_title'>Features</Heading>
            <Grid
                templateColumns="repeat(auto-fit, minmax(320px, 1fr))" 
                gap={5}
                className="features_grid"
            >
                <Box className="feature_img" display={{base: 'none', lg:'block'}}>
                    <img
                        src={GuyInChairImg}
                        alt="guy_in_a_chair"
                        className="guy_in_chair"
                    ></img>
                </Box>
                <Box background={featureCardTheme.bg} className="feature_card" color={featureCardTheme.text}>
                    <img src={PlayerImg} alt="feature"></img>
                    <Box className="feature_card_content">
                        <Heading className="feature_card_heading">
                            No ads, suggestions or anything that distracts you!
                        </Heading>
                        <Text>
                            Amet minim mollit non deserunt ullamco est sit aliqua
                            dolor do amet sint. Velit officia consequat duis enim
                            velit mollit. Exercitation veniam consequat sunt nostrud
                            amet.
                        </Text>
                    </Box>
                </Box>
                <Box background={featureCardTheme.bg} className="feature_card" color={featureCardTheme.text}>
                    <img src={ModeImg} alt="feature"></img>
                    <Box className="feature_card_content">
                        <Heading className="feature_card_heading">
                            Different modes for your eye comfort
                        </Heading>
                        <Text>
                            Amet minim mollit non deserunt ullamco est sit aliqua
                            dolor do amet sint. Velit officia consequat duis enim
                            velit mollit. Exercitation veniam consequat sunt nostrud
                            amet.
                        </Text>
                    </Box>
                </Box>
            </Grid>
        </Container>
    )
}

export default Features