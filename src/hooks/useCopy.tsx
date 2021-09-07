import { useClipboard, useToast, Alert, AlertIcon, Text } from "@chakra-ui/react"

const useCopy = (textToCopy: string) => {
    const { onCopy } = useClipboard(textToCopy)
    const toast = useToast()

    const handleCopy = () => {
        onCopy()
        toast({
            render: () => (
                <Alert status="success" variant="solid">
                    <AlertIcon />
                    <Text className="alert_text">Playlist Link Copied!</Text>
                </Alert>
            ),
            status: "success",
            position: "top",
            duration: 2500,
            isClosable: true,
        })
    }

    return { handleCopy }
}

export default useCopy
