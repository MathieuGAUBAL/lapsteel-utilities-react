import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';
import HomePagePart1 from './HomePagePart1';
import HomePagePart2 from './HomePagePart2';
import Footer from '../footer/Footer';


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleNewsSection:"",
            homepageNews: [],
            homepageCard: [],
            isRedirectVideo: false,
            isRedirectLapsteelator: false,
        }

    }


    handleClickLink = (event) => {
        switch (event.target.id) {

            case '1':
                this.setState({ isRedirectLapsteelator: true });
                break;

            case '2':
                this.setState({ isRedirectVideo: true });
                break;

            default:
                break;
        }
    }

    getHomepageNews = () => {
      

        fetch(REACT_APP_SERVER_ADDRESS_FULL + "/api/homepage?section=homepage-news-section&image_id=0", {
            method: "GET",
            json: true
        })
            .then(response => response.json())
            .then(response => {
                let array = [];
                if (response.length > 0) {
                    for (let object of response) {
                        let descriptionParse = JSON.parse(object.description);
                        object.description = descriptionParse;
                        array.push(object);
                    }
                }

                this.setState({ homepageNews: array.reverse() })
            })
            .catch(error => console.log(error));
    }

    getHomepageNewsTitle = () => {
      

        fetch(REACT_APP_SERVER_ADDRESS_FULL + "/api/homepage?section=title-news-section&image_id=0", {
            method: "GET",
            json: true
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ titleNewsSection: response[0].title });
            })
            .catch(error => console.log(error));
    }

    getHomepageCard = () => {
      
        fetch(REACT_APP_SERVER_ADDRESS_FULL + "/api/homepage/homepage-card?section=homepage-card-section", {
            method: "GET",
            json: true
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ homepageCard: response });
            })
            .catch(error => console.log(error));
    }

    componentDidMount = () => {
        this.getHomepageNews();
        this.getHomepageCard();
        this.getHomepageNewsTitle();
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return;
        };
    }


    render() {

        return (
            <div className="sticky-wrap">

                <NavBarHomePage />
                <HomePagePart1 homepageNews={this.state.homepageNews} titleNewsSection={this.state.titleNewsSection}/>
                <HomePagePart2 homepageCard={this.state.homepageCard} {...this.props} handleClickLink={this.handleClickLink} />
                {this.state.isRedirectLapsteelator ? <Redirect to='/lapsteelator' /> : ""}
                {this.state.isRedirectVideo ? <Redirect to='/videos' /> : ""}
                <div className="sticky-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}





export default Homepage;