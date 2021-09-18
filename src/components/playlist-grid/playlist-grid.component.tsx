import { PlaylistGridProps } from "../../interfaces"
import { Box, Heading, SimpleGrid, Text, Flex } from "@chakra-ui/react"
import PlaylistCard from "../playlist-card/playlist-card-component"
import './playlist-grid.scss'

const PlaylistGrid: React.FC<PlaylistGridProps> = ({
    playlists,
    handlePlaylistDelete,
    recentPlaylist
}: PlaylistGridProps) => {
    return (
        <Box className="user_playlists_container">
            <Heading className="user_page_title">{recentPlaylist ? "Recently Played" : "Your Playlists"}</Heading>
            <SimpleGrid
                margin="20px 0px"
                gap={10}
                columns={{
                    base: 1,
                    md: 2,
                    lg: 4,
                }}
            >
                {playlists.length !== 0 &&
                    playlists.map((playlist, i) => (
                        <PlaylistCard
                            recentPlaylist={recentPlaylist}
                            handlePlaylistDelete={handlePlaylistDelete}
                            key={i}
                            playlistItemCount={playlist.playlistItemCount}
                            playlistId={playlist.playlistId}
                            playlistName={playlist.playlistName}
                            playlistThumb={playlist.playlistThumb}
                            channelName={playlist.channelName}
                        />
                    ))}
            </SimpleGrid>
            {playlists.length === 0 && (
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    padding="50px"
                    rounded="md"
                >
                    <Text fontSize="xl" fontFamily="Inter, sans-serif">
                        No Playlist Yet
                    </Text>
                </Flex>
            )}
        </Box>
    )
}

export default PlaylistGrid
