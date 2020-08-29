import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './HomeAdmin.css';
import VitrineAdmin from './VitrineAdmin';
import FooterAdmin from './footerAdmin/FooterAdmin';
import HomepageAdmin from './homepageAdmin/HomepageAdmin';

class HomeAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayVitrine: false,
            displayHomepage: false,
            displayFooter: false
        }
    }

    handlerClickDisplayModule = (event) => {
        console.log(event.target.id);
        switch (event.target.id) {
            case "vitrine-admin":
                this.setState({ displayVitrine: true,displayHomepage: false, displayFooter: false });
                break;

            case "homepage-admin":
                this.setState({ displayVitrine: false, displayHomepage: true, displayFooter: false });
                break;

            case "footer-admin":
                this.setState({ displayVitrine: false,displayHomepage: false, displayFooter: true });
                break;
            default:
                break;
        }
    }


    render() {
        return (
            <div>
                {localStorage.getItem('tAoDkMeInN') ? <Redirect to="/homeAdmin" /> : <Redirect to="/login" />}
                <div className="div-container d-flex" style={{ backgroundColor: "blue", height: "100vh", width: "100vw" }}>
                    <div className="sideBar bg-dark" style={{ height: "100vh", width: "200px" }}>
                        <div className="title-admin text-white mb-5 p-2">Lapsteelator Admin</div>
                        <div className="list-menu text-left p-2 mb-5">
                            <div id="div-vitrine-admin p-2"><p className="link-sideBar-admin" id="vitrine-admin" onClick={this.handlerClickDisplayModule}>Vitrine</p></div>
                            <div id="div-homepage-admin p-2"><p className="link-sideBar-admin" id="homepage-admin" onClick={this.handlerClickDisplayModule} >Homepage</p></div>
                            <div id="div-footer-admin p-2"><p className="link-sideBar-admin" id="footer-admin" onClick={this.handlerClickDisplayModule}>Footer</p></div>
                        </div>
                        <div id="div-disconnect mt-5">
                            <button className="btn btn-danger" onClick={this.props.signOut}>Se déconnecter</button>
                        </div>
                    </div>

                    <div className="content" style={{ backgroundColor: "white", height: "100vh", width: "100vw" }}>
                        {this.state.displayVitrine && <VitrineAdmin />}
                        {this.state.displayHomepage && <HomepageAdmin />}
                        {this.state.displayFooter && <FooterAdmin />}
                    </div>

                </div>
            </div>
        )
    }
}

export default HomeAdmin;