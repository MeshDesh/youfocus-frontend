import { Skeleton, Flex, Stack, SimpleGrid, Button, Box } from "@chakra-ui/react"
import React from "react"
import { PlaylistContainerProps, VideoModel } from "../../interfaces"
import VideoCard from "../video-card/video-card-component"
import "./playlist-container.scss"

const PlaylistContainer: React.FC<PlaylistContainerProps> = ({
    fetching,
    videos,
    params,
    videoIndex,
    handleLoadMore,
    setVideoIndex,
    channelName,
}: PlaylistContainerProps) => {
    return (
        <SimpleGrid
            columns={{ base: 1, md: 2, lg: 5 }}
            spacing={10}
            alignItems='center'
            align="stretch"
            className="playlist_container"
        >
            {videos.length !== 0 || !fetching
                ? videos.map((video: VideoModel, i) => (
                      <VideoCard
                          channelName={channelName}
                          isSelected={videoIndex === i ? true : false}
                          selectVideo={() => setVideoIndex(i)}
                          id={video!.id}
                          title={video.title}
                          thumbnail={video.thumbnail}
                      ></VideoCard>
                  ))
                : [1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} height="120px" width="auto" />
                  ))}
                {params.pageToken !== undefined ? <Button className='load_more_btn' onClick={handleLoadMore} p={4}>Load More</Button> : null}
        </SimpleGrid>
    )
}

export default PlaylistContainer
