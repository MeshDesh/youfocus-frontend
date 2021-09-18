import { ArrowForwardIcon, QuestionIcon } from "@chakra-ui/icons"
import {
    Button,
    Input,
    InputGroup,
    Spinner,
    Text,
    useDisclosure,
    Box,
    ListItem,
    UnorderedList,
    Flex,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import CustomModal from "../modal/modal-component"
import "./ytform.scss"

const YoutubeForm: React.FC = () => {
    const [url, setUrl] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [disabled, setDisabled] = useState(false)
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
            setDisabled(true)
            setLoading(true)
            var playlistId = getPlaylistId(url)
            user === null ? localStorage.setItem("guestMode", JSON.stringify(true)) : localStorage.setItem("guestMode", JSON.stringify(false))
            history.push(`/player/${playlistId}`)
            setLoading(false)
        }
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
                        isDisabled={disabled}
                        children={
                            loading ? (
                                <Spinner />
                            ) : (
                                <ArrowForwardIcon fontSize="20px" />
                            )
                        }
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
        </React.Fragment>
    )
}

export default YoutubeForm
