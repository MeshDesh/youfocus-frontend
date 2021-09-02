import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Features from '../components/feature/feature-component'
import Hero from '../components/hero/hero-component'
import Navbar from '../components/navbar/navbar-component'

const Homepage: React.FC = () => {
    const history = useHistory();

    let rememberMe = localStorage.getItem("rememberMe") === "true"

    useEffect(() => {
        if (rememberMe === true) {
            history.push("/user")
        }
    }, [rememberMe, history])

    return(
       <React.Fragment>
           <Navbar/>
           <Hero/>
           <Features/>
       </React.Fragment>
    )
}

export default Homepage;