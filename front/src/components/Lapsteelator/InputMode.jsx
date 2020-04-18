import React, { Component } from 'react';

class InputMode extends Component{


  
    render(){
        const { handleOnChangeInput, handleChangeModeFrette, handleOpenWindowAddMode } = this.props;
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
                                    {/*    <!-- debut Modal Ajout Mode --> */}
                    <div className="modal" id="ajoutMode">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">

                        {/*  <!-- Header --> */}
                            <div className="modal-header">
                                <h5 className="modal-title">Ajouter un mode</h5>
                                <button className="close" data-dismiss="modal">&times;</button>
                            </div>

                            {/* <!-- Body --> */}
                            <div className="modal-body">
                                {/* <!-- div error si l'utilisateur ne rentre pas d'accordage --> */}
                                <div className="alert alert-warning alert-dismissible fade show container alert-ajout-mode" role="alert">
                                    <strong>OOPS!</strong> Il faut saisir les deux champs.
                                </div>

                                <form id='form-id-ajout-mode text-center form-group'>
                                    <label>Nom du mode</label>
                                    <input name="nom-ajout-mode" id="nom-ajout-mode" type='text' required='required'
                                        className="form-control" onChange={handleOnChangeInput}/>
                                    <label>intervalle des notes</label>
                                    <input name="input-interval-mode-added" id="input-interval-mode-added" type='text' required='required'
                                        className="form-control" onChange={handleOnChangeInput}/>
                                    <div className="pt-3 pb-3">
                                        <button type="button" className="btn btn-primary" id="ajouter-mode">Ajouter un mode</button>
                                    </div>
                                </form>
                            </div>

                            <div className="alert alert-warning alert-dismissible fade show container alert-modeAjout-mode" role="alert">
                                <strong>Bravo!</strong> Un mode a été ajouté.
                            </div>

                            <div className="alert alert-warning fade show container alert-doublon-modeAjout-mode" role="alert">
                                <strong>OOPS!</strong> Enresgitrement déjà existant.
                            </div>

                            {/* <!-- Footer --> */}
                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
            {/*  <!-- fin Modal Ajout Mode --> */} 
                </div>
            </div>
        )
    }
}

export default InputMode;