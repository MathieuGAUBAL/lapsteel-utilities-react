import React, { Component } from 'react';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';
import Footer from '../footer/Footer';
import './Vitrine.css';
import VitrinePart1 from './VitrinePart1';

class Vitrine extends Component {


    render() {
        const { userLogin } = this.props;
        return (
            <div className="sticky-wrap">
                <NavBarHomePage />
                <VitrinePart1 userLogin={userLogin} />
                <div className="sticky-footer">
                    <Footer />
                </div>

            </div>
        )
    }
}

export default Vitrine;