import React, { Component } from 'react';
import InputAccordage from './InputAccordage';
import InputTonique from './InputTonique';
import InputMode from './InputMode';
import Canvas from './Canvas';

class LapsteelModulePrincipal extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputAccordage:"",
            inputTonique:"",
            inputMode:"",
            ajoutMode:"",
            ajoutInterval:"",
            isLapsteel:true
        }
    }

    componentDidMount = () => {
        let saisieTonique = document.getElementById('input-tonique-tonique').value;
        let mode  = document.getElementById('input-interval-mode').value;

        this.setState({ 
            inputTonique:saisieTonique,
            inputMode:mode
        });
        
    }

    handleChangeModeFrette = (event) => {
        switch (event.target.value) {
            case "guitar":
                this.setState({isLapsteel:false});
                break;
            case "lapsteel":
                this.setState({isLapsteel:true});
                break;
            default:
                break;
        }
    }

    handleOnChangeInput = (event) => {
        switch (event.target.id) {
            case 'input-accordage':
                this.setState({inputAccordage:event.target.value});
                break;
            case 'input-tonique-tonique':
                console.log(event.target.value);
                this.setState({inputTonique:event.target.value});
                break;
            case 'input-interval-mode':
                this.setState({inputMode:event.target.value});
                break;
            case 'nom-ajout-mode':
                this.setState({ajoutMode:event.target.value});
                break;
            case 'input-interval-mode-added':
                this.setState({ajoutInterval:event.target.value});
                break;

            default:
                break;
        }
    }

    handleOpenWindowMode = (event) => {
        switch (event.target.id) {
            case 'ajouter-mode':
                this.setState({inputAccordage:event.target.value});
                break;

            default:
                break;
        }
    }

    render(){
        const { inputAccordage, inputTonique, inputMode, modeFrette} = this.state;
/*         console.log("**********************************")
        console.log("inputAccordage : ",inputAccordage);
        console.log("inputTonique : ", inputTonique);
        console.log("inputTonique : ", inputMode);
        console.log("**********************************") */
        return(
            <div>
                <InputAccordage handleOnChangeInput={this.handleOnChangeInput} inputAccordage={this.state.inputAccordage}/>
                <InputTonique handleOnChangeInput={this.handleOnChangeInput} getPutValue={this.getInputValue}/>
                <InputMode handleChangeModeFrette={this.handleChangeModeFrette} handleOnChangeInput={this.handleOnChangeInput}/>
                <Canvas {...this.state}/>
            </div>
        )
    }
}

export default LapsteelModulePrincipal;