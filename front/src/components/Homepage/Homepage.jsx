import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';
import HomePagePart1 from './HomePagePart1';
import getRessources from '../../utils/getRessources';
import HomePagePart2 from './HomePagePart2';
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            homepageNews:[],
            homepageCard:[]

        }
    }

 
      componentDidMount = async () => {
        // obtenir les ressources pour la section homepage-news
        let homepageNews = await getRessources('homepage','homepage-news', null, REACT_APP_SERVER_ADDRESS_FULL);
        // obtenir les ressources pour la section homepage-news
        let homepageCard = await getRessources('homepage','homepage-card',true, REACT_APP_SERVER_ADDRESS_FULL);

        this.setState({
            homepageNews:homepageNews,
            homepageCard,homepageCard
        });

      }

    render(){
        return(
            <div>
                {localStorage.getItem('tSoEkCeRnT') ?  "" :  !this.props.isLoggued && <Redirect to="/Login" />}
                <NavBarHomePage />
                <HomePagePart1 homepageNews={this.state.homepageNews}/>
                <HomePagePart2 homepageCard={this.state.homepageCard}/>
            </div>
        )
    }
}





export default Homepage;