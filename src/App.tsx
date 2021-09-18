import React, { useEffect } from "react"
import { Switch, Route, useHistory, Redirect } from "react-router-dom"
import OnboardingComponent from "./components/onboarding-form/OnboardingForm.component"
import Player from "./components/player/player-component"
import { ProvideAuth} from "./hooks/useAuth"
import Homepage from "./pages/Homepage"
import Playlists from "./pages/Playlists"

const App = () => {
    return (
        <ProvideAuth>
                <React.Fragment>
                    <Switch>
                        <Route exact path="/">
                            <Homepage />
                        </Route>
                        <Route path="/player/:playlistId">
                            <Player></Player>
                        </Route>
                        <Route path="/playlists">
                            <Playlists />
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
