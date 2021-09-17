import React from 'react'
import Features from '../components/feature/feature-component'
import Footer from '../components/footer/footer-component'
import Hero from '../components/hero/hero-component'
import Navbar from '../components/navbar/navbar-component'

const Homepage: React.FC = () => {
    return(
       <React.Fragment>
           <Navbar/>
           <Hero/>
           <Features/>
           <Footer />
       </React.Fragment>
    )
}

export default Homepage;