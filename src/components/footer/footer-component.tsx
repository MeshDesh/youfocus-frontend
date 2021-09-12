import {
    Box,
    Container,
    Flex,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"
import React from "react"
import "./footer.scss"
import LogoIcon from "../../assets/logo-icon.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import ThemeSwitch from "../theme-switch/theme-switch.component"

const Footer: React.FC = () => {
    const footerTheme = {
        bg: useColorModeValue("white", "black"),
        text: useColorModeValue("#4f4f4f", "white"),
    }

    return (
        <footer
            className="footer"
            style={{ background: footerTheme.bg, color: footerTheme.text }}
        >
            <Container maxW="container.xl">
                <Flex justifyContent="space-between">
                    <Stack direction={"row"} justifyContent='center' alignItems='center'>
                        <img src={LogoIcon} className='logo' alt="logo" />
                        <Text className="copy" fontSize='md' fontWeight='medium'>
                            &copy; {new Date().getFullYear()} Meshdesh
                        </Text>
                    </Stack>
                    <Box className="footer_controls">
                        <Text fontSize='md'>
                            Made with <FontAwesomeIcon icon={faHeart} /> in{" "}
                            <strong>India</strong>
                        </Text>
                    </Box>
                </Flex>
            </Container>
        </footer>
    )
}

export default Footer
