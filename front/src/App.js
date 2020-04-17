import React, { Component } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Vitrine from './components/Vitrine';
import LoginUser from './components/LoginUser/LoginUser';
import SignInUser from './components/Signin/SignInUser';
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
    console.log("APP constructor");

  }

  userLogin = (bool, token) => {
    this.setState({isLoggued:bool,token:token})
  }

  render(){
    console.log("APP render");
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={() => <Vitrine/>}/>
            <Route path='/Login' component={() => <LoginUser isLoggued={this.state.isLoggued} userLogin={this.userLogin}/>}/>
            <Route path='/Signin' component={SignInUser}></Route>
            <Route path='/Home' component={() => <Homepage isLoggued={this.state.isLoggued}/>}/>
            <Route path='/lapsteelator' component={() => <Lapsteelator isLoggued={this.state.isLoggued}/>}/>
            <Route path='/videos' component={() => <SectionVideo isLoggued={this.state.isLoggued}/>}/>
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
