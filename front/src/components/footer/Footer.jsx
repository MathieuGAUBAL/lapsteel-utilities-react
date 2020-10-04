import React, { Component } from 'react';


class Footer extends Component {
    constructor(props){
        super();
        this.state = {
            version:""
        }
    }

    getData = () => {
        fetch(process.env.REACT_APP_FOOTER, {
            method: "GET",
            json: true/* ,
            'Access-Control-Allow-Origin':REACT_APP_SERVER_ADDRESS_FULL,
            'Access-Control-Allow-Headers':'*',
            'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS',
            credentials: "include" */
        })
            .then(response => response.json())
            .then(response => this.setState({ version : response[0].version })  )
            .catch(error => console.log(error));
    }

    componentDidMount = () => {
        this.getData();
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        return (
            <div className="p-5 bg-dark mt-5 d-flex flex-column text-light justify-align-center">
                <div className="brandName"><p style={{ fontSize: "1.5rem" }}>Lapsteelator <span className="version" style={{ fontSize: "1rem" }}>{this.state.version}</span></p></div>
                <div className="copyright"><p>copyright 2020</p></div>
                 <div className="social-network">
                    <a href="https://www.youtube.com/user/Matc0c0/videos" title="ma chaine youtube Matc0c0" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color:"white" }}> <i className="fa fa-youtube-square fa-3x"></i></a>
                </div>
                <div className="dev pt-5 text-lg-right"><p>Développé par Matc0c0</p></div>
                
            </div>
        )
    }
}

export default Footer;