import React, { Component } from 'react';


class InputAccordage extends Component{

    

    render(){
        const { inputAccordage, handleOnChangeInput, handleOpenWindowAddMode } = this.props;
        //console.log(this.state.inputAccordage);
        return(
            <div>
                  <div className="div-accordage text-center container pt-5">
                    <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Accordage</div>
                        </div>
                        <input id="input-accordage" value={inputAccordage} type="text" size="10" className="form-control" placeholder="exemple : EADGBE" onChange={handleOnChangeInput} />
                        {/* <!-- div error si l'utilisateur ne rentre pas d'accordage --> */}
                        <div className="alert alert-warning alert-dismissible fade show container alert-saisie-accordage" role="alert">
                        <strong>OOPS!</strong> la saisie semble incorrecte.
                        </div>
                    </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default InputAccordage;