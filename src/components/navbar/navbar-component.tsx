import {
    Box,
    Stack,
    Flex,
    Text,
    Button,
    useDisclosure,
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
    MenuGroup,
    Badge,
    Avatar,
    useColorModeValue,
    Container,
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import "./navbar.scss"
import { NavLink, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle, faProductHunt } from "@fortawesome/free-brands-svg-icons"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import CustomModal from "../modal/modal-component"
import FeedbackForm from "../feedback-form/feedback-form-component"
import useAuth from "../../hooks/useAuth"

const Navbar: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: isModalOpen,
        onOpen: onModalOpen,
        onClose: onModalClose,
    } = useDisclosure()

    const { handleSignIn, user, signOut, isFirstLogin } = useAuth()
    const history = useHistory()

    useEffect(() => {
        if (isFirstLogin) {
            history.push("/onboarding")
        }
    }, [isFirstLogin])

    const {
        isOpen: isLoginOpen,
        onOpen: onLoginOpen,
        onClose: onLoginClose,
    } = useDisclosure()

    const handleLogin = () => {
        handleSignIn()
        onLoginClose()
    }

    const handleLogout = () => {
        signOut()
        localStorage.setItem('rememberMe', JSON.stringify(false))
        history.push('/')
    }
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
                    <Flex
                        align="flex-end"
                        direction="column"
                        justifyItems="flex-end"
                    >
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
                        {!user ? (
                            <Button
                                onClick={onLoginOpen}
                                colorScheme="blue"
                                className="btn feedback_btn"
                                boxShadow="sm"
                            >
                                <Text fontSize="lg">Login</Text>
                            </Button>
                        ) : null}

                        <Button
                            onClick={onModalOpen}
                            className="btn feedback_btn"
                            boxShadow="sm"
                        >
                            <Text>Provide Feedback</Text>
                        </Button>
                        {user ? (
                            <Menu>
                                <MenuButton>
                                    <Avatar
                                        src={user.avatar}
                                        name={user.name}
                                    ></Avatar>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={handleLogout}>
                                        Logout
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        ) : null}
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
                <Button onClick={handleLogin}>Login With Google</Button>
            </CustomModal>
        </nav>
    )
}

export default Navbar
