import React, { Component } from 'react';
import Footer from './../footer/Footer';
import NavBarHomePage from './../NavBarHompage/NavBarHomePage';
import './Tutoriel.css';
const ReactMarkdown = require('react-markdown');


class Tutoriel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: []
        }
    }

    getContent = () => {
        fetch(process.env.REACT_APP_TUTORIEL, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ content: response.contenu })
            })
    }

    componentDidMount = () => {
        this.getContent();
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        return (
            <div className="sticky-wrap">
                <NavBarHomePage />
                <div className="container text-left">
                    {
                        this.state.content.length > 0 &&

                        this.state.content.map((content, index) => (
                            <div className="container markdown-tuto" key={index}>
                                <ReactMarkdown source={content.text} />
                            </div>
                        ))


                    }

                </div>
                <div className="div-video-demonstration video-responsive">
                    <iframe title="Vidéo YouTube - démonstration de l'application lapsteelator" width="560" height="315" src="https://www.youtube-nocookie.com/embed/wn4vQa_5J0M" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>

                <div className="sticky-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Tutoriel;