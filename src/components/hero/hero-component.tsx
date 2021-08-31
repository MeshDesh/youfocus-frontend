import { Box, Container, Heading, SimpleGrid, Text, Flex } from "@chakra-ui/react"
import React from "react"
import "./hero.scss"
import HeroImg from "../../assets/hero.png"
import YoutubeForm from "../yt-form/ytform-component"

const Hero: React.FC = () => {
    return (
        <Container maxW="container.xl" mt='5' className='hero'>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing="10px">
                <Box className="hero_content">
                    <Heading fontSize="6xl" className="hero_heading">
                        Watch what you love on YouTube without any distraction
                    </Heading>
                    <Text className="hero_text">
                        with Youfocus watch all your playlists
                        without any distraction from ads, comments or suggestions
                    </Text>
                    <YoutubeForm/>
                </Box>
                <Box className="hero_img">
                    <img src={HeroImg} alt="hero" className="nerd_img" />
                </Box>
            </SimpleGrid>
        </Container>
    )
}

export default Hero
