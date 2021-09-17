import {
    Box,
    Container,
    Grid,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"
import React from "react"
import GuyInChairImg from "../../assets/chair_guy.svg"
import PlayerImg from "../../assets/player.svg"
import ModeImg from "../../assets/mode.svg"

import "./feature.scss"

const Features: React.FC = () => {
    const featureCardTheme = {
        bg: useColorModeValue("#EDF2F7", "#2D3748"),
        text: useColorModeValue("#171923", "#E2E8F0"),
    }

    return (
        <Container maxW="container.xl" className="feature_container">
            <Heading className="feature_title">Features</Heading>
            <Grid
                templateColumns="repeat(auto-fit, minmax(320px, 1fr))"
                gap={5}
                className="features_grid"
            >
                <Box className="feature_img" display={{ base: "none", lg: "block" }}>
                    <img
                        src={GuyInChairImg}
                        alt="guy_in_a_chair"
                        className="guy_in_chair"
                    ></img>
                </Box>
                <Box
                    background={featureCardTheme.bg}
                    className="feature_card"
                    color={featureCardTheme.text}
                >
                    <img src={PlayerImg} alt="feature"></img>
                    <Box className="feature_card_content">
                        <Heading className="feature_card_heading">
                            No ads, suggestions or anything that distracts you!
                        </Heading>
                        <Text fontSize='lg'>
                            We won't show any ads. Simply focus on why you came here.
                        </Text>
                    </Box>
                </Box>
                <Box
                    background={featureCardTheme.bg}
                    className="feature_card"
                    color={featureCardTheme.text}
                >
                    <img src={ModeImg} alt="feature"></img>
                    <Box className="feature_card_content">
                        <Heading className="feature_card_heading">
                            Different modes for your eye comfort
                        </Heading>
                        <Text fontSize='lg'>
                            Don't strain your eyes. Use dark mode for better focus.
                        </Text>
                    </Box>
                </Box>
            </Grid>
        </Container>
    )
}

export default Features
