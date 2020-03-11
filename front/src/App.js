import React, { Component } from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Vitrine from './components/Vitrine';
import LoginUser from './components/LoginUser/LoginUser';
import SignInUser from './components/Signin/SignInUser';
import Homepage from './components/Homepage/Homepage';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggued:null,
      token:""
    }

  }

  userLogin = (bool, token) => {
    this.setState({isLoggued:bool,token:token})
  }

  render(){
    console.log("(APP) isLoggued : ", this.state.isLoggued);
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/' component={() => <Vitrine/>}/>
            <Route path='/Login' component={() => <LoginUser isLoggued={this.state.isLoggued} userLogin={this.userLogin}/>}/>
            <Route path='/Signin' component={SignInUser}></Route>
            <Route path='/Home' component={() => <Homepage isLoggued={this.state.isLoggued}/>}/>
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
