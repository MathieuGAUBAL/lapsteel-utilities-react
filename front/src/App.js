import React, { Component } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Vitrine from './components/Vitrine/Vitrine';

import Homepage from './components/Homepage/Homepage';
import SectionVideo from './components/section video/SectionVideo';
import Lapsteelator from './components/Lapsteelator/Lapsteelator';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggued:null,
      token:""
    }

  }



  render(){

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={() => <Vitrine />}/>
            <Route path='/Home' component={() => <Homepage />}/>
            <Route path='/lapsteelator' component={() => <Lapsteelator/>}/>
            <Route path='/videos' component={() => <SectionVideo />}/>
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
