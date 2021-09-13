import { useState } from 'react'
import { useGoogleLogin, useGoogleLogout } from 'react-google-login'
import { useHistory } from 'react-router';
import { User } from '../interfaces/user-module';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID!

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isFirstLogin, setIsFirstLogin] = useState(false);
    const history = useHistory();
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
            const data = await res.json();
            if (data.firstLogin) {
                setUser(data.user)
                setIsFirstLogin(data.firstLogin)
            }
            setUser(data)
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
        accessType: 'offline'
    })

    const handleSignIn = () => {
        signIn()
        if (user !== null) {
            history.push("/user")
        }
    }

    const { signOut } = useGoogleLogout({
        onLogoutSuccess,
        onFailure,
        clientId
    })

    return { handleSignIn, signOut, user, isFirstLogin }
}

export default useAuth