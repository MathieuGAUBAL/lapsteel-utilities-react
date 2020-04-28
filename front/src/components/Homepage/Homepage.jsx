import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';
import HomePagePart1 from './HomePagePart1';
import getRessources from '../../utils/getRessources';
import HomePagePart2 from './HomePagePart2';
import Footer from '../footer/Footer';


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            homepageNews:[],
            homepageCard:[],
            isRedirectVideo:false,
            isRedirectLapsteelator:false,


        }
    }


    handleClickLink = (event) => {
        switch (event.target.id) {
            case '1':
                console.log("cas 1");
                this.setState({isRedirectLapsteelator:true});
                break;
            case '2':
                console.log("cas 2");
                this.setState({isRedirectVideo:true});
                break;
        
            default:
                break;
        }
    }

    componentDidMount = async () => {
    // obtenir les ressources pour la section homepage-news
    let homepageNewsArray = await getRessources('homepage','homepage-news', 0, REACT_APP_SERVER_ADDRESS_FULL);
    // obtenir les ressources pour la section homepage-news
    let homepageCardArray = await getRessources('homepage','homepage-card',true, REACT_APP_SERVER_ADDRESS_FULL);
    console.log(homepageCardArray);
    this.setState({
        homepageNews:homepageNewsArray,
        homepageCard:homepageCardArray
    });

    }

    render(){

        return(
            <div className="sticky-wrap">
                {localStorage.getItem('tSoEkCeRnT') ?  "" :  !this.props.isLoggued && <Redirect to="/Login" />}
                <NavBarHomePage />
                <HomePagePart1 homepageNews={this.state.homepageNews}/>
                <HomePagePart2 homepageCard={this.state.homepageCard} handleClickLink={this.handleClickLink}/>
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