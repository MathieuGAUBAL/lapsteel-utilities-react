import React, { Component } from 'react';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';
import { Redirect } from 'react-router-dom';
import './Lapsteelator.css';
import LapsteelModulePrincipal from './LapsteelModulePrincipal';

class Lapsteelator extends Component{
    render(){
        return(
            <div>
                 {localStorage.getItem('tSoEkCeRnT') ?  "" :  !this.props.isLoggued && <Redirect to="/Login" />}
                 <NavBarHomePage />
                <h2>LAPSTEELATOR</h2>
                <LapsteelModulePrincipal />
            </div>
        )
    }
}

export default Lapsteelator;