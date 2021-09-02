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
            localStorage.setItem('rememberMe', JSON.stringify(true))
            history.push(`/player/${playlistId}`)
            setLoading(false)
        }
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <InputGroup className="yt_input">
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
                        height="auto"
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
                    <a
                        className="yt_btn"
                        href="https://www.youtube.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Go to Youtube
                    </a>
                </InputGroup>
                {error && <Text className="error">{error}</Text>}
            </form>
            <Flex alignItems="center">
                <Button onClick={onOpen} colorScheme="blue">
                    {" "}
                    <QuestionIcon /> <Text ml={4}>Valid Urls</Text>{" "}
                </Button>
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
