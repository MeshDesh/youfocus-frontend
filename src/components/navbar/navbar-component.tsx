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
    const { user } = auth!
    const history = useHistory()
    const guestMode = localStorage.getItem("guestMode")

    const handleLogin = () => {
        auth?.handleSignIn()
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
        loginBg: useColorModeValue("#1A202C", "#E2E8F0"),
        loginText: useColorModeValue("white", "black"),
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
                        <NavLink
                            to={user || guestMode === "true" ? "/playlists" : "/"}
                        >
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
                                mt={{ base: 5, md: 0 }}
                                className="navlinks"
                            >
                                <Button
                                    marginRight='10px'
                                    onClick={onModalOpen}
                                    colorScheme='cyan'
                                    boxShadow="sm"
                                    size="lg"
                                    rounded='full'
                                >
                                    <Text>Provide Feedback</Text>
                                </Button>
                                <Button
                                    onClick={handleLogin}
                                    background={navTheme.loginBg}
                                    color={navTheme.loginText}
                                    _hover={{
                                        background: navTheme.loginBg,
                                        color: navTheme.loginText,
                                    }}
                                    _active={{
                                        background: navTheme.loginBg,
                                        color: navTheme.loginText,
                                    }}
                                    size="lg"
                                    className='btn'
                                    rounded="full"
                                    boxShadow="sm"
                                >
                                    <FontAwesomeIcon icon={faGoogle} />
                                    <Text margin="0px 10px">Login with Google</Text>
                                </Button>
                            </Stack>
                        </>
                    ) : (
                        <Menu>
                            <MenuButton>
                                <Avatar
                                    size="md"
                                    src={user.avatar}
                                    name={user.name}
                                ></Avatar>
                            </MenuButton>
                            <MenuList>
                                <Stack spacing={2} padding={4}>
                                    <MenuItem
                                        rounded="full"
                                        fontSize="xl"
                                        fontWeight="500"
                                        as="a"
                                        href="/user"
                                    >
                                        <Text
                                            padding={2}
                                            fontSize="xl"
                                            fontWeight="500"
                                        >
                                            My Playlists
                                        </Text>
                                    </MenuItem>
                                    <MenuItem
                                        rounded="full"
                                        fontSize="xl"
                                        fontWeight="500"
                                        onClick={onModalOpen}
                                    >
                                        <Text
                                            padding={2}
                                            fontSize="xl"
                                            fontWeight="500"
                                        >
                                            Provide Feedback
                                        </Text>
                                    </MenuItem>
                                    <MenuItem rounded="full" onClick={handleLogout}>
                                        <Text
                                            color='red'
                                            padding={2}
                                            fontSize="xl"
                                            fontWeight="500"
                                        >
                                            Logout
                                        </Text>
                                    </MenuItem>
                                </Stack>
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
        </nav>
    )
}

export default Navbar
