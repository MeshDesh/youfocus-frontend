import React from "react"
import {
    Switch,
    Route,
} from "react-router-dom"
import Footer from "./components/footer/footer-component"
import Player from "./components/player/player-component"
import Homepage from "./pages/Homepage"
import User from "./pages/User"

const App = () => {
    return (
        <React.Fragment>
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
            <Footer />
        </React.Fragment>
    )
}

export default App;
