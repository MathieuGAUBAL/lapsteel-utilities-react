import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';
import HomePagePart1 from './HomePagePart1';
import HomePagePart2 from './HomePagePart2';
import Footer from '../footer/Footer';


class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleNewsSection: "",
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


        fetch(process.env.REACT_APP_NEWS + '?section=news-card', {
            method: "GET",
            json: true
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                const responseArray = [];
                for (let object of response) {
                    responseArray.push(object);
                }

                let array = [];
                if (responseArray.length > 0) {
                    for (let object of response) {
                        let descriptionParse = JSON.parse(object.description);
                        object.description = descriptionParse;
                        array.push(object);
                    }
                }

                this.setState({ homepageNews: array.reverse() })
            })
            .catch(error => console.log(error.message));
    }

    getHomepageNewsTitle = () => {

        fetch(process.env.REACT_APP_NEWS + '?section=news-title', {
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

        fetch(process.env.REACT_APP_APPLICATIONS, {
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
        this.setState = (state, callback) => {
            return;
        };
    }


    render() {

        return (
            <div className="sticky-wrap">

                <NavBarHomePage />
                <HomePagePart1 homepageNews={this.state.homepageNews} titleNewsSection={this.state.titleNewsSection} />
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