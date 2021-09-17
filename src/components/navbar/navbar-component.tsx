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
import React from "react"
import "./navbar.scss"
import { NavLink, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import CustomModal from "../modal/modal-component"
import FeedbackForm from "../feedback-form/feedback-form-component"
import { useAuth } from "../../hooks/useAuth"

const Navbar: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: isModalOpen,
        onOpen: onModalOpen,
        onClose: onModalClose,
    } = useDisclosure()
    const auth = useAuth()
    const { user } = auth!;
    const history = useHistory()
    const guestMode = localStorage.getItem('guestMode');

    const {
        isOpen: isLoginOpen,
        onOpen: onLoginOpen,
        onClose: onLoginClose,
    } = useDisclosure()

    const handleLogin = () => {
        auth?.handleSignIn()
        onLoginClose()
    }

    const handleLogout = () => {
        auth?.handleSignOut()
        history.push("/")
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
                        <NavLink to={user || guestMode === 'true' ? '/my-playlists' : '/'}>
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
                    {user === null ? (
                        <>
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
                                display={{
                                    base: isOpen ? "block" : "none",
                                    md: "flex",
                                }}
                                width={{ base: "full", md: "auto" }}
                                alignItems="center"
                                spacing={5}
                                mt={{ base: 4, md: 0 }}
                                className="navlinks"
                            >
                                <Button
                                    onClick={onModalOpen}
                                    className="btn feedback_btn"
                                    boxShadow="sm"
                                >
                                    <Text>Provide Feedback</Text>
                                </Button>
                                <Button
                                    onClick={onLoginOpen}
                                    colorScheme="teal"
                                    size='lg'
                                    rounded='full'
                                    boxShadow="sm"
                                >
                                    <Text fontSize="lg">Login</Text>
                                </Button>
                            </Stack>
                        </>
                    ) : (
                        <Menu>
                            <MenuButton>
                                <Avatar
                                    size='md'
                                    src={user.avatar}
                                    name={user.name}
                                ></Avatar>
                            </MenuButton>
                            <MenuList>
                                <MenuItem as="a" href="/user">
                                    <Text fontSize="xl">My Playlists</Text>
                                </MenuItem>
                                <MenuItem fontSize="xl" onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
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
                <Button onClick={handleLogin} size="lg" width="100%">
                    <FontAwesomeIcon icon={faGoogle} />
                    <Text margin="0px 10px">Login with Google</Text>
                </Button>
            </CustomModal>
        </nav>
    )
}

export default Navbar
