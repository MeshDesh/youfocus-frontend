import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'


// const config: ThemeConfig = {
//     initialColorMode: 'light',
//     useSystemColorMode: false,
// }

const overrides = extendTheme({
    styles: {
      global: (props) => ({
        body: {
          fontFamily: "body",
          color: mode("gray.800", "whiteAlpha.900")(props),
          bg: mode("white", "black")(props),
          lineHeight: "base",
        },
      }),
    },
  })
  



const theme = extendTheme({ overrides });

export default theme;