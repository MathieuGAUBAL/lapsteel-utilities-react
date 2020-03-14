import React, { Component } from 'react';
import InputAccordage from './InputAccordage';
import InputTonique from './InputTonique';
import InputMode from './InputMode';

class LapsteelModulePrincipal extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputAccordage:"",
            inputTonique:""
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
                break
            default:
                break;
        }
    }

    render(){
        const { inputAccordage, inputTonique } = this.state;
        console.log("**********************************")
        console.log("inputAccordage : ",inputAccordage);
        console.log("inputTonique : ", inputTonique);
        console.log("**********************************")
    
        return(
            <div>
                <InputAccordage handleOnChangeInput={this.handleOnChangeInput} inputAccordage={this.state.inputAccordage}/>
                <InputTonique handleOnChangeInput={this.handleOnChangeInput}/>
                <InputMode handleOnChangeInput={this.handleOnChangeInput}/>
            </div>
        )
    }
}

export default LapsteelModulePrincipal;