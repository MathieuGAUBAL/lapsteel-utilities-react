import React, { Component } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Vitrine from './components/Vitrine/Vitrine';

import Homepage from './components/Homepage/Homepage';
import SectionVideo from './components/section video/SectionVideo';
import Lapsteelator from './components/Lapsteelator/Lapsteelator';
import HomeAdmin from './components/adminFront/HomeAdmin';
import LoginAdmin from './components/LoginAdmin/LoginAdmin';
import VitrineAdmin from './components/adminFront/VitrineAdmin';
import HomepageAdmin from './components/adminFront/HomepageAdmin';
import FooterAdmin from './components/adminFront/FooterAdmin';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeVideoIsActived: false,
      tokenIsLoad: false
    }

  }

  getDateHomepageCard = () => {
    fetch(REACT_APP_SERVER_ADDRESS_FULL + "/api/homepage/homepage-card?section=homepage-card", {
      method: "GET",
      json: true
    })
      .then(response => response.json()
        .then(response => {

          let routeVideoIsActived;
          for (let object of response) {
            if (object.title === "Videos") {
              if (object.isActived === 0) {
                routeVideoIsActived = false;
              } else {
                routeVideoIsActived = true;
              }

            }
          }
          this.setState({ routeVideoIsActived: routeVideoIsActived });
        }))
      .catch(error => console.log(error));
  }

  adminIsActived = (bool) => {
    this.setState({ tokenIsLoad: bool });
    window.localStorage.setItem('adminActived', JSON.stringify(bool));
  }

  signOut = () => {
    window.localStorage.removeItem('adminActived');
    window.localStorage.removeItem('tAoDkMeInN');
    this.setState({ tokenIsLoad: false })
  }

  componentDidMount = () => {
    this.getDateHomepageCard();

    let adminIsActived = localStorage.getItem('adminActived');
    if (localStorage.getItem('adminActived') !== null) {
      this.setState({ tokenIsLoad: adminIsActived });
    }
  }

  componentWillUnmount = () => {
    this.getDateHomepageCard();
  }



  render() {

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={() => <Vitrine />} />
            <Route path='/Home' component={() => <Homepage />} />
            <Route path='/lapsteelator' component={() => <Lapsteelator />} />
            {this.state.routeVideoIsActived && <Route path='/videos' component={() => <SectionVideo />} />}
            <Route path='/login' component={() => <LoginAdmin adminIsActived={this.adminIsActived} />} />
            <Route path='/homeAdmin' component={() => <HomeAdmin signOut={this.signOut} />} />
            {
              this.state.tokenIsLoad &&
              <>
                <Route path='/vitrine-admin' component={() => <VitrineAdmin />} />
                <Route path='/home-admin' component={() => <HomepageAdmin />} />
                <Route path='/footer-admin' component={() => <FooterAdmin />} />
              </>
            }
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
