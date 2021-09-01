import { Box, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react"
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

    const videoCardTheme = {
        bg: useColorModeValue('gray.50', 'gray.900'),
        selected:{
            bg: useColorModeValue('gray.100', 'gray.700')
        }
    }

    return (
        <Flex
            rounded='md'
            alignItems='flex-start'
            backgroundColor={isSelected ? videoCardTheme.selected.bg  : videoCardTheme.bg}
            direction={{ base: "row", md: "column" }}
            onClick={selectVideo}
            key={id}
            className={`video_card ${isSelected ? "selected" : null}`}
        >
            <Box className="video_thumbnail" rounded='md'>
                <img src={thumbnail} alt={thumbnail} />
            </Box>
            <Box className='video_info'>
                <Heading className="video_title">{title.slice(0, 50)}...</Heading>
                <Text>{channelName}</Text>
            </Box>
        </Flex>
    )
}

export default VideoCard
