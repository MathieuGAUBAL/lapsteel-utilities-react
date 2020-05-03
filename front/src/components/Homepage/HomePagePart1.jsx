import React, { Component } from 'react';


class HomePagePart1 extends Component{
    render(){
        const { homepageNews } = this.props;
        return(
            <div className="container-homepage-news">
                <h2 className="homepage-news-title">NEWS</h2>
                {homepageNews.map((element, index) => (
                    <div key={index} className="div-news-homepage">

                        <div className="container div-titre-news-homepage"><h2 className="titre-news-homepage text-left">{element.subtitle}</h2></div>
                        <div className="container div-description-news-homepage"><p  className="description-news-homepage text-left">{element.description}</p></div>
                    </div>
                ))
                }

            </div>
        )
    }
}

export default HomePagePart1;