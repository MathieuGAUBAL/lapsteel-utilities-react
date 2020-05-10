import React, { Component } from 'react';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';
import './Lapsteelator.css';
import LapsteelModulePrincipal from './LapsteelModulePrincipal';

class Lapsteelator extends Component{
    render(){
        return(
            <div>
               
                <NavBarHomePage />
                <h2>LAPSTEELATOR</h2>
                <LapsteelModulePrincipal />
            </div>
        )
    }
}

export default Lapsteelator;