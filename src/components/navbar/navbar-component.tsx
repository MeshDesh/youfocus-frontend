import {
    Box,
    Stack,
    Flex,
    Text,
    Button,
    useDisclosure,
    Badge,
    useColorModeValue,
    Container,
    Heading,
    Input,
} from "@chakra-ui/react"
import React from "react"
import "./navbar.scss"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faProductHunt } from "@fortawesome/free-brands-svg-icons"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import CustomModal from "../modal/modal-component"

const Navbar: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {isOpen: isModalOpen, onOpen:onModalOpen, onClose: onModalClose} = useDisclosure();
    const menuToggle = () => {
        isOpen ? onClose() : onOpen()
    }

    const navTheme = {
        background: useColorModeValue("white", "black"),
        text: useColorModeValue("black", "white"),
    }

    return (
        <nav style={{background: navTheme.background, color:navTheme.text}}>
        <Container maxW='container.xl'>
        <Flex
            as="nav"
            justify="space-between"
            wrap="wrap"
            className="navbar"
        >
            <Flex align="center">
                <NavLink to="/">
                    <Text
                        as="h1"
                        size="xl"
                        letterSpacing={"tighter"}
                        className="logo"
                    >
                        Playfocus
                    </Text>
                    <Badge colorScheme="green" p="1" rounded={"base"}>
                        beta
                    </Badge>
                </NavLink>
            </Flex>

            <Box
                display={{ base: "block", md: "none" }}
                onClick={menuToggle}
                cursor="pointer"
            >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="2x" />
            </Box>

            <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: isOpen ? "block" : "none", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                spacing={5}
                mt={{ base: 4, md: 0 }}
                className="navlinks"
            >
                <a href="https://producthunt.com" target="_blank" rel="noreferrer">
                    <Button
                        className="btn product_hunt_btn"
                        mt={{ base: 5, md: 0 }}
                        ml={{ base: 0, md: 5 }}
                    >
                        <FontAwesomeIcon
                            icon={faProductHunt}
                            size="2x"
                            className="ph_icon"
                        />
                        <Text fontSize="sm" fontWeight="normal">
                            Find us on
                            <Text fontSize="lg" fontWeight="bold">
                                Product Hunt
                            </Text>
                        </Text>
                    </Button>
                </a>
                <Button onClick={onModalOpen} className="btn feedback_btn" boxShadow="sm">
                    <Text>Provide Feedback</Text>
                </Button>
            </Stack>
        </Flex>
        </Container>
        <CustomModal isOpen={isModalOpen} onClose={onModalClose} title="Provide Feedback">
           <form>
            <Input id='name' placeholder='email' type='email'></Input> 
           </form>
        </CustomModal>
        </nav>
    )
}

export default Navbar
