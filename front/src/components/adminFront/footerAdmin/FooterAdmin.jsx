import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import VersionWebSite from './VersionWebSite';


class FooterAdmin extends Component {

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