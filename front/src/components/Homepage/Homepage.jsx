import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';
import HomePagePart1 from './HomePagePart1';
import getRessources from '../../utils/getRessources';
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            homepageNews:[]

        }
    }

 
      componentDidMount = async () => {
        let homepageNews = await getRessources('homepage','homepage-news',null, REACT_APP_SERVER_ADDRESS_FULL);
        this.setState({homepageNews:homepageNews});
      }

    render(){
        return(
            <div>
                {localStorage.getItem('tSoEkCeRnT') ?  "" :  !this.props.isLoggued && <Redirect to="/Login" />}
                <NavBarHomePage />
                <HomePagePart1 homepageNews={this.state.homepageNews}/>

            </div>
        )
    }
}





export default Homepage;