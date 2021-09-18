import { PlaylistInfo } from ".";

export interface User{
    name:string
    avatar:string
    email:string
}
export interface authContextInterface {
    user: {
        name: string
        avatar: string
        email: string
        createdAt: Date
        onboardingData?: {
            isLearning: boolean
            profession: string
        }
    } | null
    handleSignIn: () => void
    handleSignOut: () => void
}

export interface playlistContextInterface{
    playlists: PlaylistInfo[] | []
    recentPlaylists: PlaylistInfo[] | []
    handlePlaylistDelete: (id: string, isRecent: boolean) => void
}
