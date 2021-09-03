import {
    Box,
    Container,
    Flex,
    HStack,
    IconButton,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react"
import React from "react"
import "./footer.scss"
import LogoIcon from "../../assets/logo-icon.svg"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

const Footer: React.FC = () => {
    const { colorMode, toggleColorMode } = useColorMode()

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
                    <Stack direction={"row"}>
                        <img src={LogoIcon} alt="logo" />
                        <Text className="copy">
                            &copy; {new Date().getFullYear()} Meshdesh
                        </Text>
                    </Stack>
                    <Box className="footer_controls">
                        <IconButton
                            backgroundColor="blackAlpha"
                            rounded="full"
                            className="theme_control"
                            aria-label="icon"
                            width="20px"
                            onClick={toggleColorMode}
                            size="lg"
                            icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
                        />
                        <Text>
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
