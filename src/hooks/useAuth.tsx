import React, { createContext, useContext, useState } from "react"
import { useGoogleLogin, useGoogleLogout } from "react-google-login"
import { useHistory } from "react-router"
import { authContextInterface } from "../interfaces/user-module"

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID!

const authContext = createContext<authContextInterface | null>(null)

const ProvideAuth: React.FC = ({ children }) => {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

const useAuth = () => {
    return useContext(authContext)
}

const useProvideAuth = () => {
    const [user, setUser] = useState(null)
    const history = useHistory()

    const onSuccess = async (result: any) => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_BASE_URL}/auth`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        token: result.tokenId,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            const data = await res.json()
            if (data.firstLogin) {
                setUser(data.user)
                history.push("/onboarding")
            }else{
                setUser(data)
                history.push("/my-playlists")    
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onFailure = () => {
        console.log("login failed")
    }

    const onLogoutSuccess = () => {
        setUser(null)
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: "offline",
    })

    const { signOut } = useGoogleLogout({
        onLogoutSuccess,
        onFailure,
        clientId,
    })

    const handleSignIn = () => {
        signIn()
    }

    const handleSignOut = () => {
        signOut()
    }

    return {
        user,
        handleSignIn,
        handleSignOut,
    }
}

export { ProvideAuth, useAuth }
