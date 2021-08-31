import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import React from "react"
import { VideoCardProps } from "../../interfaces"
import "./video-card.scss"

const VideoCard: React.FC<VideoCardProps> = ({
    id,
    isSelected,
    selectVideo,
    title,
    channelName,
    thumbnail,
}: VideoCardProps) => {
    return (
        <Flex
            direction={{ base: "row", md: "column" }}
            onClick={selectVideo}
            key={id}
            className={`video_card ${isSelected ? "selected" : null}`}
        >
            <Box className="video_thumbnail">
                <img src={thumbnail} alt={thumbnail} />
            </Box>
            <Box>
                <Heading className="video_title">{title}</Heading>
                <Text>{channelName}</Text>
            </Box>
        </Flex>
    )
}

export default VideoCard
