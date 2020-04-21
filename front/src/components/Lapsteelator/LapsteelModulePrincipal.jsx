import React, { Component } from 'react';
import InputAccordage from './InputAccordage';
import InputTonique from './InputTonique';
import InputMode from './InputMode';
import Canvas from './Canvas';
import $ from 'jquery';

class LapsteelModulePrincipal extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputAccordage:"",
            inputTonique:"",
            inputMode:"",
            ajoutMode:"",
            ajoutInterval:"",
            isLapsteel:true,
            selectAddMode:"",
            localStorageArray:[],
            selectedDeleteMode:"",
            selectedEditMode:"",
            selectedEditArray:[]
        }
    }

    componentDidMount = () => {
        let saisieTonique = document.getElementById('input-tonique-tonique').value;
        let mode  = document.getElementById('input-interval-mode').value;
        let localStorageArray = JSON.parse(window.localStorage.getItem('objetAjoutMode'));

        this.setState({ 
            inputTonique:saisieTonique,
            inputMode:mode,
            localStorageArray:localStorageArray === null ? [] : localStorageArray
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
            default:
                break;
        }
    }

    dispatchLocalStorageMode = (data) => {
        this.setState({localStorageArray:data});
    }

    selectedModeToDelete = (event) => {
        let selectedDeleteMode = event.target.options[event.target.options.selectedIndex].innerText;
        this.setState({selectedDeleteMode:selectedDeleteMode});
    }

    selectedModeToEdit = (event) => {
        let arrayEditMode = [];
        let selectedEditMode = event.target.options[event.target.options.selectedIndex].innerText;
        arrayEditMode.push(selectedEditMode);
        arrayEditMode.push(event.target.options[event.target.options.selectedIndex].value);

        this.setState({selectedEditMode:selectedEditMode, selectedEditArray:arrayEditMode});
    }

    deleteMode = () => {
        
        let newObj = [];
        if(this.state.localStorageArray !== null){
            for(let i = 0; i < this.state.localStorageArray.length; i++){
                if(this.state.localStorageArray[i].hasOwnProperty(this.state.selectedDeleteMode)){
                  for(let j in this.state.localStorageArray){
                    if(j != i){
                      newObj.push(this.state.localStorageArray[j]);
                    }
                  }
                }
              }

            this.setState({localStorageArray:newObj});
            window.localStorage.setItem('objetAjoutMode', JSON.stringify([...newObj]));
            if(this.state.localStorageArray.length > 0 && this.state.localStorageArray !== null){
                $('.alert-suppression-mode').show();
                setTimeout( () => {
                    $('.alert-suppression-mode').hide();
                },3000); 
            }
        }

    }


    isCloseModalDeleteMode = (bool) => {
        this.setState({openModalDeleteMode:bool});
    }

    closeModalEditMode = () => {
        this.setState({selectedEditMode:"default"});
    }


    render(){
        return(
            <div>
                <InputAccordage handleOnChangeInput={this.handleOnChangeInput} inputAccordage={this.state.inputAccordage}/>
                <InputTonique handleOnChangeInput={this.handleOnChangeInput} getPutValue={this.getInputValue}/>
                <InputMode handleChangeModeFrette={this.handleChangeModeFrette} handleOnChangeInput={this.handleOnChangeInput} {...this.state}/>
                <Canvas 
                    handleOnChangeInput={this.handleOnChangeInput} 
                    {...this.state} 
                    dispatchLocalStorageMode={this.dispatchLocalStorageMode}
                    selectedModeToDelete = {this.selectedModeToDelete}
                    deleteMode = {this.deleteMode}
                    selectedModeToEdit = {this.selectedModeToEdit}
                    closeModalEditMode={this.closeModalEditMode}
                />
            </div>
        )
    }
}

export default LapsteelModulePrincipal;