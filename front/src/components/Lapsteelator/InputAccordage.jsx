import React, { Component } from 'react';


class InputAccordage extends Component{

    

    render(){
        const { inputAccordage, handleOnChangeInput, selectTuningModeBtn} = this.props;
        //console.log(this.state.inputAccordage);
        return(
            <div>
                  <div className="div-accordage text-center container pt-5">
                    <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <div className="input-group-text">Accordage</div>
                        </div>
                        <input name="input-accordage" id="input-accordage" value={inputAccordage} type="text" size="10" className="form-control" placeholder="exemple : EADGBE" onChange={handleOnChangeInput} />
                        {/* <!-- div error si l'utilisateur ne rentre pas d'accordage --> */}
                        <div className="alert alert-warning alert-dismissible fade show container alert-saisie-accordage" role="alert">
                        <strong>OOPS!</strong> la saisie semble incorrecte.
                        </div>
                    </div>
                    <div className="btn-group mt-1 mb-1" role="group" aria-label="Basic example">
                      <button type="button" className="btn btn-outline-primary btn-lg" id="C" onClick={selectTuningModeBtn}>C</button>
                      <button type="button" className="btn btn-outline-primary btn-lg" id="D" onClick={selectTuningModeBtn}>D</button>
                      <button type="button" className="btn btn-outline-primary btn-lg" id="E" onClick={selectTuningModeBtn}>E</button>
                      <button type="button" className="btn btn-outline-primary btn-lg" id="F" onClick={selectTuningModeBtn}>F</button>
                      <button type="button" className="btn btn-outline-primary btn-lg" id="G" onClick={selectTuningModeBtn}>G</button>
                      <button type="button" className="btn btn-outline-primary btn-lg" id="A" onClick={selectTuningModeBtn}>A</button>
                      <button type="button" className="btn btn-outline-primary btn-lg" id="B" onClick={selectTuningModeBtn}>B</button>
                    </div>
                    <div className="mb-1">
                        <button type="button" className="btn btn-outline-primary btn-lg" id="#" onClick={selectTuningModeBtn}>#</button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-outline-danger btn-lg" id="X" onClick={selectTuningModeBtn}>X</button>
                    </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default InputAccordage;