import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NewsAdmin from "./NewsAdmin";
import ApplicationsCardAdmin from './ApplicationsCardAdmin';


class HomepageAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="container">
                {localStorage.getItem('tAoDkMeInN') ? "" : <Redirect to="/login" />}
                <div className="p-3">
                    Homepage admin
                </div>

                <div className="div-component-NewsAdmin">
                    <NewsAdmin />
                </div>

                <div className="div-component-ApplicationsCardAdmin">
                    <ApplicationsCardAdmin />
                </div>


            </div>
        )
    }
}

export default HomepageAdmin;