import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';
import Footer from '../footer/Footer';
const REACT_APP_SERVER_ADDRESS_FULL_LOGIN = process.env.REACT_APP_SERVER_ADDRESS_FULL_LOGIN;


class LoginAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLoggued: false
        }
    }

    handlerInput = (event) => {
        switch (event.target.id) {
            case "email":
                this.setState({ email: event.target.value })
                break;

            case "password":
                this.setState({ password: event.target.value })
                break;

            default:
                break;
        }
    }

    handlerSubmit = (event) => {
        event.preventDefault();
        let data = {
            "identifier": this.state.email,
            "password": this.state.password
        };

        let url = REACT_APP_SERVER_ADDRESS_FULL_LOGIN;
        fetch(url, {
            method: "POST",
            headers: new Headers({ 'Accept': 'application/json', 'Content-type': 'application/json' }),
            body: JSON.stringify(data),
            mode: 'cors',
        })
            .then(response => response.json())
            .then(response => {
                if(response.statusCode !== 400){
                    localStorage.setItem('tAoDkMeInN', response.jwt);
                    this.setState({ isLoggued: true });
                    this.props.adminIsActived(true);
                }else{
                    alert("mot de passe invalide!");
                }

               
            })
            .catch(error => alert("mot de passe invalide!"));

    }



    render() {

        return (
            <div className="sticky-wrap">
                <NavBarHomePage />
                {this.state.isLoggued && <Redirect to="/homeAdmin" />}
                {localStorage.getItem('tAoDkMeInN') ? <Redirect to="/homeAdmin" /> : <Redirect to="/login" />}
                <form className="container">
                    <div className="form-group">
                        <label htmlFor="email">utilisateur</label>
                        <input type="text" className="form-control" value={this.state.email} id="email" aria-describedby="email" onChange={this.handlerInput} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">mot de passe</label>
                        <input type="password" className="form-control" value={this.state.password} id="password" onChange={this.handlerInput} />
                    </div>

                    {
                        this.state.email !== "" && this.state.password !== "" ?
                            <button type="submit" className="btn btn-primary" onClick={this.handlerSubmit}>Se connecter</button> :
                            <button type="submit" className="btn btn-secondary" onClick={(event) => event.preventDefault()}>Se connecter</button>
                    }
                </form>
                <div className="sticky-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}


export default LoginAdmin;