import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class FooterAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    

    render(){
        return(
            <div>
                {localStorage.getItem('tAoDkMeInN') ? "" : <Redirect to="/login" />}
                Footer admin
            </div>
        )
    }
}

export default FooterAdmin;