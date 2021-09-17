import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

const ThemeSwitch: React.FC = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <IconButton
            colorScheme='blue'
            rounded="full"
            className="theme_control"
            aria-label="icon"
            width="50px"
            height='50px'
            margin="0px 10px"
            onClick={toggleColorMode}
            icon={colorMode === "dark" ? <MoonIcon fontSize='18px' /> : <SunIcon fontSize='18px'/>}
        />
    )
}

export default ThemeSwitch
