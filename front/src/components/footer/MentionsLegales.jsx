import React, { Component } from 'react';
import Footer from './Footer';
import NavBarHomePage from './../NavBarHompage/NavBarHomePage';

class MentionsLegales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mentions: []
        }
    }

    getMention = () => {
        fetch(process.env.REACT_APP_MENTIONS, {
            method: "GET",
            json: true
        })
            .then(response => response.json())
            .then(response => this.setState({ mentions: response }))
            .catch(error => console.log(error));
    }

    componentDidMount = () => {
        this.getMention();
    }

    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        return (
            <div className="sticky-wrap">
                <NavBarHomePage />
                <div className="container main-text text-left">
                    <h1 className="pb-5">Mentions légales</h1>
                    <div className="intro-text">
                        <p>En vigueur au 04/10/2020</p>
                        <p>Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la connaissance des Utilisateurs du site lapsteelator.com les présentes mentions légales. </p>
                        <p>La connexion et la navigation sur le site lapsteelator.com par l’utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales. </p>
                        <p>Ces dernières sont accessibles sur le site à la rubrique « Mentions légales ». </p>
                    </div>
                    <div className="articles-mentions">
                        {
                            this.state.mentions.length > 0 && this.state.mentions.map((article, index) => (
                                <div key={index} className="pb-3">
                                    <h2 style={{fontSize:"1.5em"}}>{article.titre}</h2>
                                    <p>{article.texte}</p>
                                </div>
                            ))
                        }
                    </div>


                </div>

                <div className="sticky-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default MentionsLegales;