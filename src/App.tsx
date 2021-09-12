import { Box } from "@chakra-ui/layout"
import React, { useEffect } from "react"
import {
    Switch,
    Route,
} from "react-router-dom"
import Player from "./components/player/player-component"
import ThemeSwitch from "./components/theme-switch/theme-switch.component"
import Homepage from "./pages/Homepage"
import User from "./pages/User"
import './styles/pages/app.scss'

const App = () => {

    return (
        <React.Fragment>
            <Box className='floating_theme'>
                <ThemeSwitch />
            </Box>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route path="/player/:playlistId">
                    <Player></Player>
                </Route>
                <Route path="/user">
                    <User />
                </Route>
            </Switch>
        </React.Fragment>
    )
}

export default App;
