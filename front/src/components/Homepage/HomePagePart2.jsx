import React, { Component } from 'react';
import HomePagePart1 from './HomePagePart1';

class HomePagePart2 extends Component {
    render(){
        const { homepageCard } = this.props;
        console.log(homepageCard);
        return(
            <div className="container container-homepage-part2">
                <hr className="mt-5 mb-5"></hr>
                <h2 className="mb-5">Applications</h2>
                <div className="card-deck">
                    {homepageCard.map((element, index) => (
                        <div key={index} className="card">
                            <img className="card-img-top" src={element.url} alt={element.alt}/>
                            <div className="card-body">
                                <h5 className="card-title">{element.title}</h5>
                                <p className="card-text">{element.description}</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>   
                    ))}
                </div>
            </div>
        )
    }
}

export default HomePagePart2;

