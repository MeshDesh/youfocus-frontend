import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import theme from "./theme"
import "./styles/styles.scss"
import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ColorModeScript />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
