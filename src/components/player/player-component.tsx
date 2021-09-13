import {
    Box,
    Skeleton,
    useBreakpointValue,
    Heading,
    Spacer,
    Text,
    Flex,
    Button,
    Stack,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import YouTube, { Options } from "react-youtube"
import useCopy from "../../hooks/useCopy"
import usePlaylistFetch from "../../hooks/usePlaylistFetch"
import { PlaylistParams } from "../../interfaces"
import PlaylistContainer from "../playlist-container/playlist-container-component"
import "./player.scss"

const Player: React.FC = () => {
    const { playlistId } = useParams<{ playlistId: string }>()
    const [videoIndex, setVideoIndex] = useState(0)
    const [params, setParams] = useState<PlaylistParams>({
        playlistId: playlistId,
        pageToken: "",
    })
    const { handleCopy } = useCopy(window.location.href)
    const { videos, playlist, fetching=true, handleLoadMore } = usePlaylistFetch({
        params,
        setParams,
    })

    const opts: Options = {
        height: useBreakpointValue({ base: "360px", md: "540px", lg: "720px" }),
        width: "100%",
        playerVars: {
            autoplay: 0,
        },
    }

    return (
        <React.Fragment>
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
            <Box margin="10px" padding="10px" className="player_ui">
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    className="video_info"
                >
                    <Box>
                        {videos.length !== 0 ? (
                            <Heading
                                fontSize={{ base: "2xl", md: "4xl" }}
                                className="video_title"
                            >
                                {videos[videoIndex].title}
                            </Heading>
                        ) : (
                            <>
                                <Skeleton
                                    height="32px"
                                    width={{base: 'md', md: 'lg', lg: 'xl'}}
                                    mt={4}
                                    mb={4}
                                />
                                <Skeleton
                                    height="32px"
                                    width='xs'
                                    mt={4}
                                    mb={4}
                                />
                            </>
                        )}
                        <Spacer />
                        {Object.keys(playlist).length !== 0 && (
                            <Text className="channel_name">
                                {playlist.channelName}
                            </Text>
                        )}
                    </Box>
                    <Stack
                        direction={{ base: "column", md: "row", lg: "row" }}
                        justifyItems="end"
                        alignItems="flex-end"
                    >
                        <NavLink to="/">
                            <Button colorScheme="red" fontSize="12px">
                                Home
                            </Button>
                        </NavLink>
                        <Button
                            onClick={handleCopy}
                            colorScheme="cyan"
                            fontSize="12px"
                        >
                            Copy Playlist Link
                        </Button>
                    </Stack>
                </Flex>
                <PlaylistContainer
                    params={params}
                    fetching={fetching}
                    videos={videos}
                    handleLoadMore={handleLoadMore}
                    channelName={playlist.channelName || ""}
                    videoIndex={videoIndex}
                    setVideoIndex={setVideoIndex}
                ></PlaylistContainer>
            </Box>
        </React.Fragment>
    )
}

export default Player
