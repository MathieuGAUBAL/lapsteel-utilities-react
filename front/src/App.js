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
import MentionsLegales from './components/footer/MentionsLegales';
import HomepageAdmin from './components/adminFront/homepageAdmin/HomepageAdmin';
import FooterAdmin from './components/adminFront/footerAdmin/FooterAdmin';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenIsLoad: false
    }

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
  
    let adminIsActived = localStorage.getItem('adminActived');
    if (localStorage.getItem('adminActived') !== null) {
      this.setState({ tokenIsLoad: adminIsActived });
    }
  }



  render() {

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={() => <Vitrine />} />
            <Route path='/Home' component={() => <Homepage />} />
            <Route path='/lapsteelator' component={() => <Lapsteelator />} />
            <Route path='/videos' component={() => <SectionVideo />} />
            <Route path='/mentions-legales' component={() => <MentionsLegales />} />
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
