import { ArrowForwardIcon, QuestionIcon } from "@chakra-ui/icons"
import {
    Button,
    Input,
    InputGroup,
    Spinner,
    Text,
    Select,
    SelectField,
    Alert,
    AlertIcon,
    useToast,
    useDisclosure,
    Box,
    ListItem,
    UnorderedList,
    Stack,
    Flex,
} from "@chakra-ui/react"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { PlaylistForm } from "../../interfaces"
import { CATEGORIES } from "../../utils/constants"
import CustomModal from "../modal/modal-component"
import "./ytform.scss"

const YoutubeForm: React.FC = () => {
    const [url, setUrl] = useState("")
    const [error, setError] = useState("")
    const [playlistForm, setPlaylistForm] = useState<PlaylistForm>({
        playlistId: "",
        category: CATEGORIES[0].value,
    })
    const { onOpen, onClose, isOpen } = useDisclosure()
    const toast = useToast()
    const {
        onOpen: onPlaylistFormOpen,
        onClose: onPlaylistFormClose,
        isOpen: isPlaylistFormOpen,
    } = useDisclosure()
    var urlReg = new RegExp("[&?]list=([a-z0-9_]+)", "i")
    let history = useHistory()
    const auth = useAuth()
    const { user } = auth!
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setError("")
        setUrl(e.currentTarget.value)
    }

    const getPlaylistId = (url: string) => {
        var reg = new RegExp("[&?]list=([^&]+)", "i")
        var match = reg.exec(url)

        if (match && match[1].length > 0) {
            return match[1]
        }
    }

    const validateUrl = (url: string) => {
        let isValid = true
        if (url === "" || !urlReg.exec(url)) {
            setError("Please enter a valid url")
            isValid = false
        }
        return isValid
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (validateUrl(url)) {
            var playlistId = getPlaylistId(url)
            setPlaylistForm({ ...playlistForm, playlistId: playlistId! })
            user === null
                ? localStorage.setItem("guestMode", JSON.stringify(true))
                : localStorage.setItem("guestMode", JSON.stringify(false))
            onPlaylistFormOpen()
        }
    }

    const handlePlaylistFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        axios
            .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/add-playlist-to-public`, {
                playlistForm,
            })
            .then(() => {
                toast({
                    duration: 2000,
                    position: "top",
                    render: () => (
                        <Alert variant="solid" size="md" status="success">
                            <AlertIcon />
                            <Text
                                fontSize="xl"
                                fontWeight="medium"
                                fontFamily="Inter, sans-serif"
                            >
                                Thank you! You can now watch your playlist 
                            </Text>
                        </Alert>
                    ),
                    isClosable: true,
                })
                history.push(`/player/${playlistForm.playlistId}`)
            })
            .catch((error) => {
                toast({
                    duration: 2000,
                    position: "top",
                    render: () => (
                        <Alert variant="solid" size="md" status="error">
                            <AlertIcon />
                            <Text
                                fontSize="xl"
                                fontWeight="medium"
                                fontFamily="Inter, sans-serif"
                            >
                                {error.message}
                            </Text>
                        </Alert>
                    ),
                    isClosable: true,
                })
            })
    }


    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <InputGroup
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    className="yt_input"
                >
                    <Input
                        placeholder="Enter your playlist url"
                        type="url"
                        id="url"
                        className="yt_input_field"
                        name="url"
                        onChange={handleChange}
                    />
                    <Button
                        className="add_icon"
                        type="submit"
                        height="40px"
                        width="50px"
                        children={<ArrowForwardIcon fontSize="20px" />}
                    />
                    <Button
                        margin="0px 5px"
                        onClick={onOpen}
                        colorScheme="gray"
                        width="50px"
                        height="40px"
                        borderRadius="50px"
                    >
                        <QuestionIcon fontSize="14px" />
                    </Button>
                </InputGroup>
                {error && <Text className="error">{error}</Text>}
            </form>
            <Flex alignItems="center">
                <a
                    className="yt_btn"
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noreferrer"
                >
                    Go to Youtube
                </a>
            </Flex>
            <CustomModal
                isOpen={isOpen}
                onClose={onClose}
                title="Valid Playlist URLs"
            >
                <Box>
                    <UnorderedList fontSize="14px" spacing={5} fontWeight="100">
                        <ListItem>
                            https://www.youtube.com/playlist?list=
                            <strong>PLAYLIST_ID</strong>
                        </ListItem>
                        <ListItem>
                            https://www.youtube.com/watch?v=R0XjwtP_iTY&list=
                            <strong>PLAYLIST_ID</strong>
                        </ListItem>
                        <ListItem>
                            http://www.youtube.com/watch?list=
                            <strong>PLAYLIST_ID</strong>&v=pFS4zYWxzNA&
                        </ListItem>
                        <ListItem>
                            https://www.youtube.com/playlist?list=
                            <strong>PLAYLIST_ID</strong>
                        </ListItem>
                    </UnorderedList>
                </Box>
            </CustomModal>
            <CustomModal
                isOpen={isPlaylistFormOpen}
                title="What is this Playlist For?"
                onClose={onPlaylistFormClose}
            >
                <form onSubmit={handlePlaylistFormSubmit}>
                    <Stack spacing={5}>
                        <div>
                            <label htmlFor="playlistId">
                                <Text fontSize="xl" margin="10px 0px">
                                    Playlist Id:
                                </Text>
                            </label>
                            <Input
                                size="lg"
                                type="text"
                                id="playlistId"
                                name="playlistId"
                                defaultValue={playlistForm.playlistId}
                                disabled
                            ></Input>
                        </div>
                        <div>
                            <label htmlFor="playlistId">
                                <Text fontSize="xl" margin="10px 0px">
                                    What is the Playlist Category?
                                </Text>
                            </label>
                            <Select fontSize='xl' size="lg" id="category" name="category" onChange={(e) => setPlaylistForm({...playlistForm, category: e.target.value})}>
                                {CATEGORIES.map((category, i) => (
                                    <option defaultValue={CATEGORIES[0].value} value={category.value} key={i}>
                                            {category.key}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            width="100%"
                        >
                            <Button
                                type="submit"
                                width="100px"
                                size="lg"
                                colorScheme="blue"
                            >
                                Submit
                            </Button>
                        </Box>                    
                    </Stack>
                </form>
            </CustomModal>
        </React.Fragment>
    )
}

export default YoutubeForm
