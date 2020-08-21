import React, { Component } from 'react';


class HomePagePart2 extends Component {

    render() {
        const { homepageCard, handleClickLink } = this.props;

        return (
            <div className="container container-homepage-part2">
                <hr className="mt-5 mb-5"></hr>
                <h2 className="mb-5">Applications</h2>
                <div className="card-deck">
                    {homepageCard.map((element, index) => (
                        <div key={index} className="card">
                            {/*  <img className="card-img-top" src={element.url} alt={element.alt}/> */}
                            <div className="card-body">
                                <h5 className="card-title">{element.title}</h5>
                                <p className="card-text">{element.description}</p>
                            </div>
                            <div className="card-footer">
                                {element.isActived !== 0
                                    ? <button id={element.image_id} className="btn btn-primary"  onClick={handleClickLink}>Accéder à l'application</button>
                                    :  <button id={element.image_id} className={"btn btn-secondary"}>indisponible</button>
                                }
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default HomePagePart2;

