import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"
import React from "react"
import { ModalProps } from "../../interfaces"
import './modal.scss'


const CustomModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title
}: ModalProps) => {
    return (
        <Modal size='xl'  isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className='modal'>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton padding='10px' margin='10px'  />
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default CustomModal
