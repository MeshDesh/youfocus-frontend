import React, { Dispatch, MouseEventHandler, SetStateAction } from "react";

export interface VideoModel{
    id: string,
    thumbnail: string,
    title: string,
    description:string
}

export interface VideoCardProps{
    id: string,
    thumbnail: string,
    title: string,
    channelName:string,
    isSelected: boolean,
    selectVideo(): void
}

export interface PlaylistInfo{
    playlistItemCount:number,
    playlistId: string,
    playlistName:string,
    playlistThumb:string,
    recent?:boolean,
    channelName: string
}

export interface PlaylistCardProps extends PlaylistInfo{
    recentPlaylist: boolean,
    handlePlaylistDelete: Function
}

export interface PlaylistContainerProps{
    params: PlaylistParams,
    handleLoadMore: MouseEventHandler,
    fetching:boolean,
    videos: Array<VideoModel>,
    videoIndex: number,
    setVideoIndex: Function,
    channelName: string    
}

export interface PlaylistParams{
    playlistId?: string,
    pageToken?: string | undefined
}

export interface PlaylistGridProps{
    playlists: Array<PlaylistInfo>,
    handlePlaylistDelete: Function,
    recentPlaylist: boolean,
}

export interface UseFetchProps{
    params: PlaylistParams,
    setParams: Dispatch<SetStateAction<PlaylistParams>>
}

export interface PlaylistForm{
    playlistId: string,
    category: string
}