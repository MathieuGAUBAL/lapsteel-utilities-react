import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Vitrine from './components/Vitrine';
import LoginUser from './components/LoginUser/LoginUser';
import SignInUser from './components/Signin/SignInUser';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Vitrine}></Route>
          <Route path='/Login' component={LoginUser}></Route>
          <Route path='/Signin' component={SignInUser}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
