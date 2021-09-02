import axios from "axios"
import { useState, useEffect } from "react"
import {
    VideoModel,
    PlaylistInfo,
    UseFetchProps,
} from "../interfaces"

const useFetch = ({ params, setParams }: UseFetchProps) => {
    const [fetching, setFetching] = useState(false)
    const [videos, setVideos] = useState<Array<VideoModel>>([])
    const [error, setError] = useState({})
    const [playlist, setPlaylist] = useState<Partial<PlaylistInfo>>({})

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
            } catch (error) {
                console.log(error)
                setError(error)
            }
        }

        getPlaylist(params)
    }, [])


    useEffect(() => {
        if (Object.keys(playlist).length !== 0 && playlist.constructor === Object) {
            const storedPlaylists =
                JSON.parse(localStorage.getItem("playlists") || "[]") || []

            const recentlyPlayed =
                JSON.parse(localStorage.getItem("recentlyPlayed") || "[]") || []

            recentlyPlayed[0] = playlist
            localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed))

            const playlistFound = storedPlaylists.find(
                (a: PlaylistInfo) => a.playlistId === playlist.playlistId
            )

            if (!playlistFound) {
                storedPlaylists.push(playlist)
            }
            
            localStorage.setItem("playlists", JSON.stringify(storedPlaylists))
        }
    }, [playlist])


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
                return error
            })
    }


    return { playlist, error, fetching, videos, handleLoadMore }
}

export default useFetch
