import React, { Component } from 'react';

class InputMode extends Component{



    render(){
        const { handleOnChangeInput, handleChangeModeFrette } = this.props;
        return(
            <div>
            {/* 	 <!-- Menu déroulant pour sélectionner le mode --> */}
                <div className="div-mode text-center container input-group mt-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="input-interval-mode">Mode</label>
                    </div>
                    
                        <select id="input-interval-mode" name="nom" size="1" className="form-control" onChange={handleOnChangeInput}>
                            <option value="1.5T 1T 1T 1.5T 1T">Pentatonique mineure</option>
                            <option value="1T 1T 1.5T 1T 1.5T">Pentatonique majeure</option>
                        </select>
                    
                        <div className="container pt-5">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" value="guitar" className="btn btn-primary" onClick={handleChangeModeFrette} >Guitar</button>
                        <button type="button" value="lapsteel" className="btn btn-primary" onClick={handleChangeModeFrette}>Lapsteel</button>
                    </div>
                    <button className="btn btn-outline-primary" data-toggle="modal"  data-target="#ajoutMode"><i className="fa fa-plus"></i></button>
                    <button className="btn btn-outline-primary" data-toggle="modal" data-target="#suppressionMode"> <i className="fa fa-minus"></i> </button>
                    <button className="btn btn-outline-primary" data-toggle="modal" data-target="#modifierMode"> <i className="fa fa-edit"></i> </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default InputMode;