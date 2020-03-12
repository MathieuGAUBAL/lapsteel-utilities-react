import React, { Component } from 'react';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';
import { Redirect } from 'react-router-dom';

class SectionVideo extends Component{
    render(){
        console.log(this.props);
        return(
            <div>
                 {localStorage.getItem('tSoEkCeRnT') ?  "" :  !this.props.isLoggued && <Redirect to="/Login" />}
                 <NavBarHomePage/>
                <h2>SECTION VIDEO</h2>
            </div>
        )
    }
}

export default SectionVideo;