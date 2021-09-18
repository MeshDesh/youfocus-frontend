import { Container, Heading, Box } from "@chakra-ui/react"
import axios from "axios"
import React, { useState, useEffect } from "react"
import Navbar from "../components/navbar/navbar-component"
import PlaylistGrid from "../components/playlist-grid/playlist-grid.component"
import YoutubeForm from "../components/yt-form/ytform-component"
import { useAuth } from "../hooks/useAuth"
import { PlaylistInfo } from "../interfaces"
import "../styles/pages/my_playlists.scss"

const Playlists: React.FC = () => {
    const [playlists, setPlaylists] = useState<Array<PlaylistInfo>>([])
    const [recent, setRecent] = useState<Array<PlaylistInfo>>([])
    const auth = useAuth()
    const { user } = auth!

    useEffect(() => {
        const fetchUserPlaylists = async() => {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_BACKEND_BASE_URL}/user-playlists`,
                    {
                        user
                    }
                )
                const playlists:Array<PlaylistInfo> = res.data.payload;
                const recentPlaylist:Array<PlaylistInfo> = playlists.filter((playlist) => playlist.recent === true)
                setPlaylists(playlists);
                setRecent(recentPlaylist);
            } catch (error) {
                console.log(error)
            }
        }
    
        if(user === null)
        {
            let storedPlaylists = JSON.parse(
                localStorage.getItem("playlists") || "[]"
            )
            let recentPlaylist = JSON.parse(
                localStorage.getItem("recentlyPlayed") || "[]"
            )
            setRecent(recentPlaylist)
            setPlaylists(storedPlaylists)
        }else{
            fetchUserPlaylists()
        }
    }, [user])


    const removePlaylist = async(id: string) => {
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_BASE_URL}/remove-playlist`,
                {
                    user,
                    id,
                }
            )
            const updatedPlaylist = playlists.filter((playlist) => id !== playlist.playlistId)
            setPlaylists(updatedPlaylist);
            setRecent(updatedPlaylist.filter((p) => p.recent === true));
        } catch (error) {
            console.log(error)
        }
    }

    const handlePlaylistDelete = (id: string, isRecent: boolean) => {
        if (user === null) {
            let updatedPlaylists = isRecent
                ? recent.filter((playlist) => id !== playlist.playlistId)
                : playlists.filter((playlist) => id !== playlist.playlistId)
            if (isRecent) {
                setRecent(updatedPlaylists)
                localStorage.setItem(
                    "recentlyPlayed",
                    JSON.stringify(updatedPlaylists)
                )
            } else {
                setPlaylists(updatedPlaylists)
                localStorage.setItem("playlists", JSON.stringify(updatedPlaylists))
            }
        }else{
            removePlaylist(id)
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

export default Playlists
