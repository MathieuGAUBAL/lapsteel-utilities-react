import React, { Component } from 'react';
import NavBarVitrine from '../NavBarVitrine/NavBarVitrine';

class SignInUser extends Component{

    render(){
        return(
            <div>
                <NavBarVitrine />
                <h1>Créer un compte gratuitement</h1>
                <form className="container">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Mot de passe</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">créer le compte</button>
                    </form>
            </div>
        )
    }
}

export default SignInUser;