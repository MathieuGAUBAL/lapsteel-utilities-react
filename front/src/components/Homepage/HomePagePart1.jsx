import React, { Component } from 'react';
import './homepagePart1.css'

class HomePagePart1 extends Component {
    render() {
        const { homepageNews, titleNewsSection } = this.props;
        return (
            <div className="container-homepage-news">
                <h2 className="homepage-news-title p-5">{titleNewsSection}</h2>
                {homepageNews.map((element, index) => (
                    <div key={index} className="container div-news-homepage p-2">
                        <div className="container div-titre-news-homepage">
                            <h2 className="titre-news-homepage text-left"><span className="titre-news-homepage">{element.description.date + " : "}</span>{element.subtitle}</h2>
                            <h6 className="text-left maj">{element.description.maj !== undefined ? " (maj : " + element.description.maj + ")" : ""}</h6>
                        </div>
                        <div className="container div-description-news-homepage"><p className="description-news-homepage text-left">{element.description.description}</p></div>
                    </div>
                ))
                }
                {homepageNews.length === 0 ?
                    <div className="no-news"><p>Pas de news</p></div> : ""}

            </div>
        )
    }
}

export default HomePagePart1;