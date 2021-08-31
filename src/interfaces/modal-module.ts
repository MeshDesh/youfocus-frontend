import React from "react";

export interface ModalProps{
    isOpen:boolean,
    title: string,
    children:React.ReactChild,
    onClose():void,
}