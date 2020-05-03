import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class VitrinePart1 extends Component{


    render(){
        return(
          <div className="row" style={{marginRight:"0",marginLeft:"0"}}>
                <div className="container jumbotron col-lg-6 bg-white">
                    <h1 className="display-4">Bienvenue sur Lapsteelator</h1>
                    <hr className="my-4"></hr>
                    <h4 className="h">Pourquoi Lapsteelator ?</h4>
                    <p className="lead">Cette application a été conçu pour vous permettre de gagner du temps sur la visualisation des gammes pour lapsteel guitar. Vous pourrez générer vos gammes selon votre accordage.</p>
                    <hr className="my-4"></hr>
                    <h4>Pour accéder à l'application, créer un compte gratuitement.</h4>
                    <p className="lead mt-5">
                        <NavLink to="/Signin"><button type="button" className="btn btn-primary btn-lg">Ouvrir un compte</button></NavLink>
                    </p>
                </div>
                <div className="img-vitrine col-lg-6" style={{paddingRight:"0"}}>
                    <img className="w-100" src="/images/vitrine/screen-pc.png" alt="illustration d'une lapsteel guitar"/>
                </div>
          </div>

           
        )
    }
}

export default VitrinePart1;