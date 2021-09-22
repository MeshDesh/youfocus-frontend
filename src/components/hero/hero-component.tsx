import { Box, Container, Heading, SimpleGrid, Text, Flex, Button, useDisclosure } from "@chakra-ui/react"
import React, { useState } from "react"
import "./hero.scss"
import HeroImg from "../../assets/hero.png"
import YoutubeForm from "../yt-form/ytform-component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { useAuth } from "../../hooks/useAuth"

const Hero: React.FC = () => {
    const [guestMode, setGuestMode] = useState(false)
    const auth = useAuth()
    const handleGuestMode = () => {
        setGuestMode(!guestMode)
    }

    return (
        <Container maxW="container.xl" mt="5" className="hero">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing="10px">
                <Box className="hero_content">
                    <Heading fontSize="6xl" className="hero_heading">
                        Watch what you love on YouTube without any distraction
                    </Heading>
                    <Text className="hero_text">
                        with Youfocus watch all your playlists without any
                        distraction from ads, comments or suggestions
                    </Text>
                    <Flex margin='20px 0px' justifyContent='flex-start' alignItems='center'>
                        <Button colorScheme='teal' size='lg' onClick={handleGuestMode}>
                            Continue As Guest
                        </Button>
                        <Text margin='0px 10px'>Or</Text>
                        <Button onClick={auth?.handleSignIn} colorScheme='red' size='lg'>
                            <FontAwesomeIcon icon={faGoogle}/> <Text margin='0px 10px'>Login with Google</Text>
                        </Button>
                    </Flex>
                    {guestMode && <YoutubeForm />}
                </Box>
                <Box className="hero_img">
                    <img src={HeroImg} alt="hero" className="nerd_img" />
                </Box>
            </SimpleGrid>
        </Container>
    )
}

export default Hero
