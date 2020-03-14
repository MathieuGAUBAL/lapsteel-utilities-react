import React, { Component } from 'react';
import NavBarVitrine from './NavBarVitrine/NavBarVitrine';
import Footer from './footer/Footer';
import './Vitrine.css';

class Vitrine extends Component{


    render(){
        return(
        <div className="sticky-wrap">
            <NavBarVitrine /> 
            <h1>Vitrine</h1>
            <div className="sticky-footer">
                <Footer />
            </div>

        </div>
        )
    }
}

export default Vitrine;