import axios from "axios"
import { useState, useEffect } from "react"
import { VideoModel, PlaylistInfo, UseFetchProps } from "../interfaces"
import { useAuth } from "./useAuth"

const usePlaylistFetch = ({ params, setParams }: UseFetchProps) => {
    const [fetching, setFetching] = useState(true)
    const [videos, setVideos] = useState<Array<VideoModel>>([])
    const [error, setError] = useState<any | null>({})
    const [playlist, setPlaylist] = useState<Partial<PlaylistInfo>>({})
    const auth = useAuth()
    const { user } = auth!

    useEffect(() => {
        setFetching(true)
        const getPlaylist = async (params: object) => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_BACKEND_BASE_URL}/playlist`,
                    {
                        params,
                    }
                )
                const { playlistInfo, playlistData } = res.data.payload
                setParams({ ...params, pageToken: playlistData.nextPageToken })
                setPlaylist(playlistInfo || {})
                setFetching(false)
                setVideos(playlistData.videos)
                if (
                    Object.keys(playlistInfo).length !== 0 &&
                    playlistInfo.constructor === Object
                ) {
                    if (user === null) {
                        addPlaylistToGuest(playlistInfo)
                    } else {
                        addPlaylistToUser(playlistInfo)
                    }
                    addPlaylistToRecent(playlistInfo)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getPlaylist(params)
    }, [])

    const addPlaylistToUser = async (playlist: PlaylistInfo) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_BASE_URL}/add-playlist`,
                {
                    user,
                    playlist: {
                        ...playlist,
                        recent: true,
                    },
                }
            )
            return res
        } catch (error) {
            console.log(error)
        }
    }

    const addPlaylistToGuest = (playlist: PlaylistInfo) => {
        const storedPlaylists =
            JSON.parse(localStorage.getItem("playlists") || "[]") || []

        const playlistFound = storedPlaylists.find(
            (a: PlaylistInfo) => a.playlistId === playlist.playlistId
        )
        if (!playlistFound) {
            storedPlaylists.push(playlist)
        }

        localStorage.setItem("playlists", JSON.stringify(storedPlaylists))
    }

    const addPlaylistToRecent = (playlist: PlaylistInfo) => {
        const recentlyPlayed =
            user === null
                ? JSON.parse(localStorage.getItem("guestRecent") || "[]") || []
                : JSON.parse(localStorage.getItem("userRecent") || "[]") || []

        recentlyPlayed[0] = playlist
        user === null
            ? localStorage.setItem("guestRecent", JSON.stringify(recentlyPlayed))
            : localStorage.setItem("userRecent", JSON.stringify(recentlyPlayed))
    }

    const handleLoadMore = async () => {
        setFetching(true)
        await axios
            .get(`${process.env.REACT_APP_BACKEND_BASE_URL}/playlist`, { params })
            .then((result) => {
                const { playlistData } = result.data.payload
                setFetching(false)
                setParams({ ...params, pageToken: playlistData.nextPageToken })
                setVideos([...videos, ...playlistData.videos])
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return { playlist, error, fetching, videos, handleLoadMore }
}

export default usePlaylistFetch
