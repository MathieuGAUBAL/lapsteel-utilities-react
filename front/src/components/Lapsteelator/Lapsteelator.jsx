import React, { Component } from 'react';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';
import { Redirect } from 'react-router-dom';

class Lapsteelator extends Component{
    render(){
        return(
            <div>
                 {localStorage.getItem('tSoEkCeRnT') ?  "" :  !this.props.isLoggued && <Redirect to="/Login" />}
                 <NavBarHomePage />
                <h2>LAPSTEELATOR</h2>
            </div>
        )
    }
}

export default Lapsteelator;