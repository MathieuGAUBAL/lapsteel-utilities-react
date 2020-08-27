import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import VersionWebSite from './VersionWebSite';


class FooterAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    render() {
        return (
            <div>
                {localStorage.getItem('tAoDkMeInN') ? "" : <Redirect to="/login" />}
                Footer admin
                <VersionWebSite />
            </div>
        )
    }
}

export default FooterAdmin;