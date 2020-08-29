import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class VitrineAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                {localStorage.getItem('tAoDkMeInN') ? "" : <Redirect to="/login" />}
                Vitrine admin
            </div>
        )
    }
}

export default VitrineAdmin;