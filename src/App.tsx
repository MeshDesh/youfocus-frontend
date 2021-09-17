import { Box } from "@chakra-ui/layout"
import React, { useEffect } from "react"
import { Switch, Route, useHistory } from "react-router-dom"
import OnboardingComponent from "./components/onboarding-form/OnboardingForm.component"
import Player from "./components/player/player-component"
import ThemeSwitch from "./components/theme-switch/theme-switch.component"
import { ProvideAuth, useAuth } from "./hooks/useAuth"
import Homepage from "./pages/Homepage"
import MyPlaylists from './pages/MyPlaylists'
import "./styles/pages/app.scss"

const App = () => {
    const history = useHistory()
    const auth = useAuth()
    const guestMode = localStorage.getItem('guestMode')

    useEffect(() => {
        if(guestMode === "true"){
            history.push('/my-playlists')
        }
    }, [guestMode])

    return (
        <ProvideAuth>
            <React.Fragment>
                <Box className="floating_theme">
                    <ThemeSwitch />
                </Box>
                <Switch>
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                    <Route path="/player/:playlistId">
                        <Player></Player>
                    </Route>
                    <Route path="/my-playlists">
                        <MyPlaylists />
                    </Route>
                    <Route path="/onboarding">
                        <OnboardingComponent />
                    </Route>
                </Switch>
            </React.Fragment>
        </ProvideAuth>
    )
}

export default App
