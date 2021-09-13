import { Box } from "@chakra-ui/layout"
import React, { useEffect } from "react"
import { Switch, Route, useHistory } from "react-router-dom"
import OnboardingComponent from "./components/onboarding-form/OnboardingForm.component"
import Player from "./components/player/player-component"
import ThemeSwitch from "./components/theme-switch/theme-switch.component"
import useAuth from "./hooks/useAuth"
import Homepage from "./pages/Homepage"
import User from "./pages/User"
import "./styles/pages/app.scss"

const App = () => {
    // const {user, isFirstLogin} = useAuth()
    // const history = useHistory()

    // useEffect(() => {
    //     if(isFirstLogin){
    //         history.push('/onboarding')
    //     }
    // }, [isFirstLogin])

    return (
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
                <Route path="/user">
                    <User />
                </Route>
                <Route path="/onboarding">
                    <OnboardingComponent />
                </Route>
            </Switch>
        </React.Fragment>
    )
}

export default App
