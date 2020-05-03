import React, { Component } from 'react';
import NavBarVitrine from './../NavBarVitrine/NavBarVitrine';
import Footer from '../footer/Footer';
import './Vitrine.css';
import VitrinePart1 from './VitrinePart1';

class Vitrine extends Component{


    render(){
        return(
        <div className="sticky-wrap">
            <NavBarVitrine /> 
            <VitrinePart1 />
            <div className="sticky-footer">
                <Footer />
            </div>

        </div>
        )
    }
}

export default Vitrine;