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
            selectedEditArray:[],
            editNameMode:"",
            editIntervalMode:""
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

    handleChangeEditMode = (event) => {

        switch (event.target.name) {
          case "nom-modification-mode":
              
              this.setState({editNameMode:event.target.value});
            break;
    
          case "interval-modification-mode":
           
              this.setState({editIntervalMode:event.target.value});
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

        this.setState({
            selectedEditMode:selectedEditMode,
            selectedEditArray:arrayEditMode
            });
    }

    deleteMode = () => {
        if(this.state.selectedDeleteMode){
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
    
                
                window.localStorage.setItem('objetAjoutMode', JSON.stringify([...newObj]));
                this.setState({localStorageArray:newObj, selectedDeleteMode:""});
                if(this.state.localStorageArray.length > 0 && this.state.localStorageArray !== null){
                    $('.alert-suppression-mode').show();
                    setTimeout( () => {
                        $('.alert-suppression-mode').hide();
                    },3000); 
                }
            }
        }


    }


    editMode = () => {
        // array qui servira a accueillir le local storage
      let localStorageArray = this.state.localStorageArray;
      let array = [];
      let sameName = false;
    
      let nomModificationMode = this.state.editNameMode.trim();
      let intervalModificationMode = this.state.editIntervalMode.toUpperCase().trim();
  
      let modeSelection = document.getElementById('interval-mode-list-modification');
  
      
  
      //boucle qui servira a savoir s'il exite des doublons avec nomModificationMode et le data.localStorageArray
      //si true alors pas de modification du nom
      for(let i = 0; i < this.state.localStorageArray.length; i++){
        if(this.state.localStorageArray[i].hasOwnProperty(nomModificationMode)){
          for(let j in this.state.localStorageArray){
            if(j == i){
              sameName = true;
            }
          }
        }
      }
      
      
      if(!sameName){
        if(this.state.selectedEditMode){
          for(let i = 0; i < localStorageArray.length; i++){ 
            if(localStorageArray[i].hasOwnProperty(this.state.selectedEditMode)){

                // si l'input interval n'est pas renseigné alors on le le modifie pas
                if(intervalModificationMode !== ""){
                localStorageArray[i][`${this.state.selectedEditMode}`] = intervalModificationMode;
                }

                if(this.state.editNameMode !== ""){
                    let str = JSON.stringify(localStorageArray[i]);
                    str = str.replace(this.state.selectedEditMode, nomModificationMode);
                    let parsed = JSON.parse(str);
                    array.push(parsed);
                }else{
                    let str = JSON.stringify(localStorageArray[i]);
                    str = str.replace(this.state.selectedEditMode, this.state.selectedEditMode);
                    let parsed = JSON.parse(str);
                    array.push(parsed);
                }

            }else{
              array.push(localStorageArray[i]);
            }
          }
          console.log(array);
          this.setState({localStorageArray:array})
          //data.localStorageArray = array;
          //console.log(data.localStorageArray)
          window.localStorage.setItem('objetAjoutMode', JSON.stringify([...array]));
          this.setState({editNameMode:"", editIntervalMode:""});
          $('.alert-rename-modeAjout-mode').show();
          setTimeout( () => {
            $('.alert-rename-modeAjout-mode').hide();
          },2000);
  
        }else{
          $('.alert-error-rename-modeAjout-mode').show();
          setTimeout( () => {
            $('.alert-error-rename-modeAjout-mode').hide();
        
          },2000);
        }
  
      }else{
        $('.alert-doublon-modeAjout-mode').show();
        setTimeout( () => {
          $('.alert-doublon-modeAjout-mode').hide();
        },2000);
      }
    }


    isCloseModalDeleteMode = () => {
        
        if(this.state.selectedDeleteMode){
            this.setState({selectedDeleteMode:""});
        }
       
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
                    handleChangeEditMode={this.handleChangeEditMode}
                    editMode={this.editMode}
                    isCloseModalDeleteMode={this.isCloseModalDeleteMode}
                />
            </div>
        )
    }
}

export default LapsteelModulePrincipal;