import { Container, Heading, Box } from "@chakra-ui/react"
import React, { useState, useEffect } from "react"
import Navbar from "../components/navbar/navbar-component"
import PlaylistGrid from "../components/playlist-grid/playlist-grid.component"
import YoutubeForm from "../components/yt-form/ytform-component"
import { PlaylistInfo } from "../interfaces"
import "./User-page.scss"

const MyPlaylists: React.FC = () => {
    const [playlists, setPlaylists] = useState<Array<PlaylistInfo>>([])
    const [recent, setRecent] = useState<Array<PlaylistInfo>>([])

    useEffect(() => {
        let storedPlaylists = JSON.parse(localStorage.getItem("playlists") || "[]")
        let recentPlaylist = JSON.parse(
            localStorage.getItem("recentlyPlayed") || "[]"
        )
        setRecent(recentPlaylist)
        setPlaylists(storedPlaylists)
    }, [])

    const handlePlaylistDelete = (id: string, isRecent: boolean) => {
        let updatedPlaylists = isRecent
            ? recent.filter((playlist) => id !== playlist.playlistId)
            : playlists.filter((playlist) => id !== playlist.playlistId)
        if (isRecent) {
            setRecent(updatedPlaylists)
            localStorage.setItem("recentlyPlayed", JSON.stringify(updatedPlaylists))
        } else {
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
                {recent.length !== 0 ? (
                    <PlaylistGrid
                        recentPlaylist={true}
                        playlists={recent}
                        handlePlaylistDelete={handlePlaylistDelete}
                    />
                ) : null}
                <PlaylistGrid
                    recentPlaylist={false}
                    playlists={playlists}
                    handlePlaylistDelete={handlePlaylistDelete}
                />
            </Container>
        </div>
    )
}

export default MyPlaylists
