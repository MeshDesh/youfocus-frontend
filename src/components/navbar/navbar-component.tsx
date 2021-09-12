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
} from "@chakra-ui/react"
import React from "react"
import "./navbar.scss"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faProductHunt } from "@fortawesome/free-brands-svg-icons"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import CustomModal from "../modal/modal-component"
import FeedbackForm from "../feedback-form/feedback-form-component"

const Navbar: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: isModalOpen,
        onOpen: onModalOpen,
        onClose: onModalClose,
    } = useDisclosure()

    const {
        isOpen: isLoginOpen,
        onOpen: onLoginOpen,
        onClose: onLoginClose,
    } = useDisclosure()

    const menuToggle = () => {
        isOpen ? onClose() : onOpen()
    }

    const navTheme = {
        background: useColorModeValue("white", "black"),
        text: useColorModeValue("black", "white"),
    }

    return (
        <nav style={{ background: navTheme.background, color: navTheme.text }}>
            <Container maxW="container.xl">
                <Flex
                    as="nav"
                    justify="space-between"
                    wrap="wrap"
                    className="navbar"
                >
                    <Flex align="flex-end" direction='column' justifyItems="flex-end">
                        <Badge colorScheme="green" p="0" m={0} rounded={"base"}>
                            beta
                        </Badge>
                        <NavLink to="/">
                            <Text
                                as="h1"
                                size="xl"
                                letterSpacing={"tighter"}
                                className="logo"
                            >
                                Playfocus
                            </Text>
                        </NavLink>
                    </Flex>

                    <Box
                        display={{ base: "block", md: "none" }}
                        onClick={menuToggle}
                        cursor="pointer"
                    >
                        <FontAwesomeIcon
                            icon={isOpen ? faTimes : faBars}
                            size="2x"
                        />
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
                        <Button
                            onClick={onLoginOpen}
                            colorScheme="blue"
                            className="btn feedback_btn"
                            boxShadow="sm"
                        >
                            <Text fontSize="lg">Login</Text>
                        </Button>

                        <Button
                            onClick={onModalOpen}
                            className="btn feedback_btn"
                            boxShadow="sm"
                        >
                            <Text>Provide Feedback</Text>
                        </Button>
                    </Stack>
                </Flex>
            </Container>
            <CustomModal
                isOpen={isModalOpen}
                onClose={onModalClose}
                title="Provide Feedback"
            >
                <FeedbackForm />
            </CustomModal>
            <CustomModal
                isOpen={isLoginOpen}
                onClose={onLoginClose}
                title="Login for More Features!"
            >
                {/* <Button colorScheme='red' padding={8} width='100%' onClick={signInWithGoogle}>
                    <Text margin='0px 10px' fontSize='xl'> Signin with Google </Text> <FontAwesomeIcon size='2x' icon={faGoogle}></FontAwesomeIcon>
                </Button> */}
                <Text>Hello</Text>
            </CustomModal>
        </nav>
    )
}

export default Navbar
