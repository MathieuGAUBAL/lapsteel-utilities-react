import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class HomepageAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                {localStorage.getItem('tAoDkMeInN') ? "" : <Redirect to="/login" />}
                Homepage admin
            </div>
        )
    }
}

export default HomepageAdmin;