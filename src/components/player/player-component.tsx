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
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionIcon,
    AccordionButton,
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
    const { videos, playlist, fetching, handleLoadMore } = usePlaylistFetch({
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
                    justifyContent="space-around"
                    alignItems="flex-start"
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
                                    width={{ base: "md", md: "lg", lg: "xl" }}
                                    mt={4}
                                    mb={4}
                                />
                                <Skeleton height="32px" width="xs" mt={4} mb={4} />
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
                        <NavLink to="/playlists">
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
                    <Spacer />
                </Flex>
                {videos.length !== 0 ? (
                    <Accordion allowToggle margin="20px 0px">
                        <AccordionItem border='none' width='auto'>
                            <AccordionButton display='flex' border='1px solid gray' rounded='md' width='200px'>
                                <Box flex="1" textAlign="left"  fontSize='xl'>
                                   Video Description
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel p={8} fontSize='14px'>
                                {videos[videoIndex].description}
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                ) : (
                    <Skeleton
                        height="32px"
                        width={{ base: "md", md: "lg", lg: "xl" }}
                        mt={4}
                        mb={4}
                    />
                )}
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
