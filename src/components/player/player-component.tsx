import {
    Box,
    Container,
    Skeleton,
    useBreakpointValue,
    Heading,
    Spacer,
    Text,
    Flex,
    Button,
    useClipboard,
    useToast,
    Alert,
    AlertIcon,
} from "@chakra-ui/react"
import axios from "axios"
import React, { useState, useEffect } from "react"
import useInfiniteScroll from "react-infinite-scroll-hook"
import { NavLink, useParams } from "react-router-dom"
import YouTube, { Options } from "react-youtube"
import { PlaylistInfo, PlaylistParams, VideoModel } from "../../interfaces"
import PlaylistContainer from "../playlist-container/playlist-container-component"
import "./player.scss"

const Player: React.FC = () => {
    const { playlistId } = useParams<{ playlistId: string }>()
    const [fetching, setFetching] = useState(true);
    const [videos, setVideos] = useState<Array<VideoModel>>([])
    const [videoIndex, setVideoIndex] = useState(0)
    const [playlist, setPlaylist] = useState<Partial<PlaylistInfo>>({})
    const [params, setParams] = useState<PlaylistParams>({ playlistId: playlistId, pageToken: ''});
    const { onCopy } = useClipboard(window.location.href)
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

    const getPlaylist = async (params: object) => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/playlist", {
                params,
            })
            const {playlistInfo, playlistData} = res.data.payload;
            setParams({ ...params, pageToken: playlistData.nextPageToken});
            setPlaylist(playlistInfo || {})
            setVideos(playlistData.videos)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPlaylist(params)
    }, [])

    useEffect(() => {
        if (Object.keys(playlist).length !== 0 && playlist.constructor === Object) {
            const storedPlaylists =
                JSON.parse(localStorage.getItem("playlists") || "[]") || new Array()
            const recentlyPlayed =
                JSON.parse(localStorage.getItem("recentlyPlayed") || "[]") ||
                new Array()
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

    const opts: Options = {
        height: useBreakpointValue({ base: "320px", md: "540px", lg: "640px" }),
        width: "100%",
        playerVars: {
            autoplay: 0,
        },
    }

    
    const handleLoadMore = async () => {
        await axios
            .get("http://localhost:8000/api/v1/playlist", { params })
            .then((result) => {
                console.log('here')
                setParams({ ...params, pageToken: result.data.nextPageToken })
                setVideos([...videos, ...result.data.items])
            })
            .catch((error) => {
                return error
            })
    }

    const infiniteRef = useInfiniteScroll({
        loading:fetching,
        hasNextPage: params.pageToken !== '' ? true : false,
        onLoadMore: handleLoadMore,
        
    });

    return (
        <Container maxW="container.xl" className="player_ui">
            <Box className="player_container">
                {videos.length !== 0 ? (
                    <YouTube
                        className="player"
                        videoId={videos[videoIndex].id}
                        opts={opts}
                    ></YouTube>
                ) : (
                    <Skeleton height={opts.height} />
                )}
            </Box>
            <Flex justifyContent="space-between" className="video_info">
                <Box>
                    {videos.length !== 0 ? (
                        <Heading className="video_title">
                            {videos[videoIndex].title}
                        </Heading>
                    ) : (
                        <Skeleton height="32px" width="500px" mt={4} mb={4} />
                    )}
                    <Spacer />
                    {Object.keys(playlist).length !== 0 && (
                        <Text className="channel_name">{playlist.channelName}</Text>
                    )}
                </Box>
                <Flex direction="column" alignItems="flex-end">
                    <NavLink to="/">
                        <Button colorScheme="red" fontSize="12px">
                            Go Back To Home
                        </Button>
                    </NavLink>
                    <Button
                        onClick={handleCopy}
                        colorScheme="cyan"
                        margin="10px 0px"
                        fontSize="12px"
                    >
                        Share Playlist
                    </Button>
                </Flex>
            </Flex>
            <Box
                ref={() => infiniteRef}
                overflow="hidden"
                rounded="md"
                height='100%'
                border="1px solid lightgrey"
                padding="10px"
            >
                <PlaylistContainer
                    fetching={fetching}
                    videos={videos}
                    channelName={playlist.channelName || ''}
                    videoIndex={videoIndex}
                    setVideoIndex={setVideoIndex}
                ></PlaylistContainer>
            </Box>
        </Container>
    )
}

export default Player
