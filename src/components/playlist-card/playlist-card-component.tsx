import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react"
import React from "react"
import { NavLink } from "react-router-dom"
import { PlaylistInfo } from "../../interfaces"
import "./playlist-card.scss"
const PlaylistCard: React.FC<PlaylistInfo> = ({
    playlistId,
    playlistDescription,
    playlistName,
    playlistItemCount,
    playlistThumb,
    channelName,
}: PlaylistInfo) => {

    const playlistCardTheme = {
        bg: useColorModeValue("#F7FAFC", "#2D3748"),
    }

    return (
        <NavLink to={`/player/${playlistId}`}>
            <Box
                key={playlistId}
                className="playlist_card"
                background={playlistCardTheme.bg}
            >
                <Box className="playlist_thumb">
                    <img src={playlistThumb}></img>
                </Box>
                <Box className="playlist_info">
                    <Heading className="playlist_name">{playlistName}</Heading>
                    <Text className='playlist_desc'>{playlistDescription ? `${playlistDescription.slice(0,50)}...` : null}</Text>
                    <Text className='playlist_count'>{playlistItemCount} Videos</Text>
                    <Text className="playlist_channel">{channelName}</Text>
                </Box>
            </Box>
        </NavLink>
    )
}

export default PlaylistCard
