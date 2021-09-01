import {
    Container,
    Heading,
    Box,
    SimpleGrid,
    Skeleton,
    Flex,
    Text,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useEffect } from "react"
import Navbar from "../components/navbar/navbar-component"
import PlaylistCard from "../components/playlist-card/playlist-card-component"
import YoutubeForm from "../components/yt-form/ytform-component"
import { PlaylistInfo } from "../interfaces"
import "./User-page.scss"

const User: React.FC = () => {
    const [playlists, setPlaylists] = useState<Array<PlaylistInfo>>([])
    const [loading, setLoading] = useState(true)
    const [recent, setRecent] = useState<Array<PlaylistInfo>>([])

    useEffect(() => {
        let storedPlaylists = JSON.parse(localStorage.getItem("playlists") || "[]")
        let recentPlaylist = JSON.parse(
            localStorage.getItem("recentlyPlayed") || "[]"
        )
        setRecent(recentPlaylist)
        setPlaylists(storedPlaylists)
        setLoading(false)
    }, [])

    const handlePlaylistDelete = (id: string, isRecent: boolean) => {
        let updatedPlaylists = isRecent
            ? recent.filter((playlist) => id !== playlist.playlistId)
            : playlists.filter((playlist) => id !== playlist.playlistId)
        if (isRecent) {
            setRecent(updatedPlaylists)
            localStorage.setItem("recentlyPlayed", JSON.stringify(updatedPlaylists))
        }else{
            setPlaylists(updatedPlaylists)
            localStorage.setItem("playlists", JSON.stringify(updatedPlaylists))
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <Container maxW="container.xl" className="user_page">
                <Box className="user_page_form">
                    <Heading className="yt_form_heading">Find more playlist</Heading>
                    <YoutubeForm></YoutubeForm>
                </Box>
                <Box className="user_playlists_container">
                    <Heading className="user_page_title">Recently Played</Heading>
                    <SimpleGrid
                        margin="20px 0px"
                        gap={10}
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 4,
                        }}
                    >
                        {recent.length !== 0 &&
                            recent.map((playlist, i) => (
                                <PlaylistCard
                                    key={i}
                                    recentPlaylist
                                    handlePlaylistDelete={handlePlaylistDelete}
                                    playlistItemCount={playlist.playlistItemCount}
                                    playlistId={playlist.playlistId}
                                    playlistName={playlist.playlistName}
                                    playlistThumb={playlist.playlistThumb}
                                    channelName={playlist.channelName}
                                />
                            ))}
                        {loading &&
                            [1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} height="200px" width="auto" />
                            ))}
                    </SimpleGrid>
                    {recent.length === 0 && (
                        <Flex
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                            padding="50px"
                            rounded="md"
                        >
                            <Text fontSize="16px">No Playlist Yet</Text>
                        </Flex>
                    )}
                </Box>
                <Box className="user_playlists_container">
                    <Heading className="user_page_title">Your Playlists</Heading>
                    <SimpleGrid
                        margin="20px 0px"
                        gap={10}
                        columns={{
                            base: 1,
                            md: 2,
                            lg: 4,
                        }}
                    >
                        {playlists.length !== 0 &&
                            playlists.map((playlist, i) => (
                                <PlaylistCard
                                    recentPlaylist={false}
                                    handlePlaylistDelete={handlePlaylistDelete}
                                    key={i}
                                    playlistItemCount={playlist.playlistItemCount}
                                    playlistId={playlist.playlistId}
                                    playlistName={playlist.playlistName}
                                    playlistThumb={playlist.playlistThumb}
                                    channelName={playlist.channelName}
                                />
                            ))}
                        {loading &&
                            [1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} height="200px" width="auto" />
                            ))}
                    </SimpleGrid>
                    {playlists.length === 0 && (
                        <Flex
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                            padding="50px"
                            rounded="md"
                        >
                            <Text fontSize="16px">No Playlist Yet</Text>
                        </Flex>
                    )}
                </Box>
            </Container>
        </div>
    )
}

export default User
