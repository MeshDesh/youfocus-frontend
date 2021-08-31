import { Skeleton, Flex } from "@chakra-ui/react"
import React from "react"
import { PlaylistContainerProps, VideoModel } from "../../interfaces"
import VideoCard from "../video-card/video-card-component"
import "./playlist-container.scss"

const PlaylistContainer: React.FC<PlaylistContainerProps> = ({
    fetching,
    videos,
    videoIndex,
    setVideoIndex,
    channelName,
}: PlaylistContainerProps) => {
    return (
        <Flex
            height={{ base: "500px", md: "250px" }}
            direction={{ base: "column", md: "row" }}
            overflowX={{ base: "hidden", md: "scroll" }}
            overflowY={{ base: "scroll", md: "hidden" }}
            spacing={10}
            align="stretch"
            className="playlist_container"
        >
            {videos.length !== 0 || !fetching ? (
                videos.map((video: VideoModel, i) => (
                    <VideoCard
                        channelName={channelName}
                        isSelected={videoIndex === i ? true : false}
                        selectVideo={() => setVideoIndex(i)}
                        id={video!.id}
                        title={video.title}
                        thumbnail={video.thumbnail}
                    ></VideoCard>
                ))
            ) : (
                <Skeleton height="120px" width="auto" />
            )}
        </Flex>
    )
}

export default PlaylistContainer
