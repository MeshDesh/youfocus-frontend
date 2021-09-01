import {
    Box,
    Heading,
    MenuButton,
    Menu,
    Stack,
    Text,
    useColorModeValue,
    MenuList,
    MenuItem,
    Button,
    Portal,
    useToast,
    useClipboard,
    Alert,
    AlertIcon,
} from "@chakra-ui/react"
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { NavLink } from "react-router-dom"
import { PlaylistCardProps } from "../../interfaces"
import "./playlist-card.scss"

const PlaylistCard: React.FC<PlaylistCardProps> = ({
    playlistId,
    recentPlaylist,
    playlistName,
    handlePlaylistDelete,
    playlistItemCount,
    playlistThumb,
    channelName,
}: PlaylistCardProps) => {


    const { onCopy } = useClipboard(`${window.location.origin}/player/${playlistId}`)
    const toast = useToast()


    const handleCopy = () => {
        onCopy()
        toast({
            render: () => (
                <Alert status="success" variant="solid">
                    <AlertIcon />
                    <Text className="alert_text">Playlist Link Copied!</Text>
                </Alert>
            ),
            status: "success",
            position: "top",
            duration: 2500,
            isClosable: true,
        })
    }


    const playlistCardTheme = {
        bg: useColorModeValue("#F7FAFC", "#2D3748"),
    }

    return (
        <Box
            p={1}
            overflow="hidden"
            maxWidth="32rem"
            maxHeight="50rem"
            key={playlistId}
            className="playlist_card"
            background={playlistCardTheme.bg}
        >
            <Box className="playlist_thumb">
                <Menu isLazy>
                    <MenuButton
                        rounded="full"
                        as={Button}
                        aria-label="options_icon"
                        className="options_menu"
                        color='white'
                        backgroundColor='black'
                    >
                        <FontAwesomeIcon
                            icon={faEllipsisV}
                            size="1x"
                        ></FontAwesomeIcon>
                    </MenuButton>
                    <Portal>
                        <MenuList className='playlist_options'>
                            <MenuItem fontFamily='Inter' fontSize="xl" onClick={handleCopy}>Share</MenuItem>
                            <MenuItem onClick={() => handlePlaylistDelete(playlistId, recentPlaylist)} fontFamily='Inter' color='red.400' fontSize="xl">Delete</MenuItem>
                        </MenuList>
                    </Portal>
                </Menu>
                <img src={playlistThumb}></img>
            </Box>
            <NavLink to={`/player/${playlistId}`}>
                <Stack className="playlist_info" spacing={5}>
                    <Heading className="playlist_name">{playlistName}</Heading>
                    <Text className="playlist_count">
                        {playlistItemCount} Videos
                    </Text>
                    <Text className="playlist_channel">{channelName}</Text>
                </Stack>
            </NavLink>
        </Box>
    )
}

export default PlaylistCard
