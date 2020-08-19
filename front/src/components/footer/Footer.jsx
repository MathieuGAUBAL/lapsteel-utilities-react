import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="p-5 bg-dark mt-5 d-flex flex-column text-light justify-align-center">
                <div className="brandName"><p style={{ fontSize: "1.5rem" }}>Lapsteelator</p></div>
                <div className="copyright"><p>copyright 2020</p></div>
                <div className="social-network">
                    <a href="https://www.youtube.com/user/Matc0c0/videos" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color:"white" }}> <i className="fa fa-youtube-square fa-3x"></i></a>
                </div>
            </div>
        )
    }
}

export default Footer;