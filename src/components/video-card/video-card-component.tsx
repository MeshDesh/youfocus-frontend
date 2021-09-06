import { Badge, Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react"
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
            minheight='30rem'
            alignItems='flex-start'
            justifyContent='flex-start'
            justifyItems='flex-start'
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
                {isSelected && <Badge variant='solid' colorScheme='green' padding={2} marginLeft='10px'>Playing Now</Badge>}
                <Heading className="video_title">{title.slice(0, 50)}...</Heading>
                <Text className='video_channel_name'>{channelName}</Text>
            </Box>
        </Flex>
    )
}

export default VideoCard
