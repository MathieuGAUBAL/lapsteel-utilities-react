import React, { Component } from 'react';


class InputAccordage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { inputAccordage, handleOnChangeInput } = this.props;
        //console.log(this.state.inputAccordage);
        return(
            <div>
                  <div className="div-accordage text-center container pt-5">
                    <div className="form-group">
                {/*  <!-- div error si l'utilisateur ne rentre pas d'accordage --> */}
{/*                     <div className="alert alert-warning alert-dismissible fade show container" role="alert">
                    <strong>OOPS!</strong> Vous avez oublié de saisir un accordage.
                    </div> */}
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Accordage</div>
                        </div>
                        <input id="input-accordage" value={inputAccordage} type="text" size="10" className="form-control" placeholder="exemple : EADGBE" onChange={handleOnChangeInput} />
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}

export default InputAccordage;