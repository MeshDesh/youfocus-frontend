import React, { Dispatch, SetStateAction } from "react";

export interface VideoModel{
    id: string,
    thumbnail: string,
    title: string
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
    playlistDescription: string,
    channelName: string
}

export interface PlaylistContainerProps{
    fetching:boolean,
    videos: Array<VideoModel>,
    videoIndex: number,
    setVideoIndex: Function,
    channelName: string    
}

export interface PlaylistParams{
    playlistId?: string,
    pageToken?: string | any
}