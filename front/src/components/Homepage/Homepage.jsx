import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';



class Homepage extends Component{
    render(){
        console.log(this.props.token);
        return(
            <div>
                {localStorage.getItem('tSoEkCeRnT') ?  "" :  !this.props.isLoggued && <Redirect to="/Login" />}
                <NavBarHomePage />
                <h2>HOMEPAGE</h2>
            </div>
        )
    }
}





export default Homepage;