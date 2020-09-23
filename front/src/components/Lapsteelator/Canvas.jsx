import React, { Component } from 'react';
import $ from 'jquery';
import './Lapsteelator.css';
import './Canvas.css';



let data = {
  accordage:[],
  tonique:"",
  gammeTonique : [],
  notes:['C','C#','D','D#','E','F','F#','G','G#','A','A#','B','C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
  mancheGuitare : [],
  modeNum:[],
  gammeMode : [],
  notesFinales:[],
  localStorageArray:'',
  selectedEditArray:[],
  verifySameAddMode:[],
  addModeTemp :[]
}

//images des numéros des frettes
let num_fret_3 = new Image();
let num_fret_5 = new Image();
let num_fret_7 = new Image();
let num_fret_9 = new Image();
let num_fret_12 = new Image();
let num_fret_15 = new Image();
let num_fret_17 = new Image();
let num_fret_19 = new Image();
var num_fret_21 = new Image();

num_fret_3.src = '/images/image-fret/num_fret_3.gif';
num_fret_5.src = '/images/image-fret/num_fret_5.gif';
num_fret_7.src = '/images/image-fret/num_fret_7.gif';
num_fret_9.src = '/images/image-fret/num_fret_9.gif';
num_fret_12.src = '/images/image-fret/num_fret_12.gif';
num_fret_15.src = '/images/image-fret/num_fret_15.gif';
num_fret_17.src = '/images/image-fret/num_fret_17.gif';
num_fret_19.src = '/images/image-fret/num_fret_19.gif';
num_fret_21.src = '/images/image-fret/num_fret_21.gif';
    
//images des notes
let c = new Image();
let cd = new Image();
let d = new Image();
let dd = new Image();
let e = new Image();
let f = new Image();
let fd = new Image();
let g = new Image();
let gd = new Image();
let a = new Image();
let adi = new Image();
let b = new Image();
let vide = new Image();

c.src = '/images/image-note-active/C.gif';
cd.src = '/images/image-note-active/Cd.gif';
d.src = '/images/image-note-active/D.gif';
dd.src = '/images/image-note-active/Dd.gif';
e.src = '/images/image-note-active/E.gif';
f.src = '/images/image-note-active/F.gif';
fd.src = '/images/image-note-active/Fd.gif';
g.src = '/images/image-note-active/G.gif';
gd.src = '/images/image-note-active/Gd.gif';
a.src = '/images/image-note-active/A.gif';
adi.src = '/images/image-note-active/Adi.gif';
b.src = '/images/image-note-active/B.gif';
vide.src = '/images/image-note-active/vide.gif';


//images des notes accordage du manche
let c_manche = new Image();
let cd_manche = new Image();
let d_manche = new Image();
let dd_manche = new Image();
let e_manche = new Image();
let f_manche = new Image();
let fd_manche = new Image();
let g_manche = new Image();
let gd_manche = new Image();
let a_manche = new Image();
let ad_manche = new Image();
let b_manche = new Image();

c_manche.src = '/images/image-accordage/C_manche.gif';
cd_manche.src = '/images/image-accordage/Cd_manche.gif';
d_manche.src = '/images/image-accordage/D_manche.gif';
dd_manche.src = '/images/image-accordage/Dd_manche.gif';
e_manche.src = '/images/image-accordage/E_manche.gif';
f_manche.src = '/images/image-accordage/F_manche.gif';
fd_manche.src = '/images/image-accordage/Fd_manche.gif';
g_manche.src = '/images/image-accordage/G_manche.gif';
gd_manche.src = '/images/image-accordage/Gd_manche.gif';
a_manche.src = '/images/image-accordage/A_manche.gif';
ad_manche.src = '/images/image-accordage/Ad_manche.gif';
b_manche.src = '/images/image-accordage/B_manche.gif';


//images des notes toniques selectionnées 
let c_tonique = new Image();
let cd_tonique = new Image();
let d_tonique = new Image();
let dd_tonique = new Image();
let e_tonique = new Image();
let f_tonique = new Image();
let fd_tonique = new Image();
let g_tonique = new Image();
let gd_tonique = new Image();
let a_tonique = new Image();
let ad_tonique = new Image();
let b_tonique = new Image();

c_tonique.src = '/images/image-tonique-selected/C_tonique.gif';
cd_tonique.src = '/images/image-tonique-selected/Cd_tonique.gif';
d_tonique.src = '/images/image-tonique-selected/D_tonique.gif';
dd_tonique.src = '/images/image-tonique-selected/Dd_tonique.gif';
e_tonique.src = '/images/image-tonique-selected/E_tonique.gif';
f_tonique.src = '/images/image-tonique-selected/F_tonique.gif';
fd_tonique.src = '/images/image-tonique-selected/Fd_tonique.gif';
g_tonique.src = '/images/image-tonique-selected/G_tonique.gif';
gd_tonique.src = '/images/image-tonique-selected/Gd_tonique.gif';
a_tonique.src = '/images/image-tonique-selected/A_tonique.gif';
ad_tonique.src = '/images/image-tonique-selected/Ad_tonique.gif';
b_tonique.src = '/images/image-tonique-selected/B_tonique.gif';

let guitar_bg = new Image();
//guitar_bg.src = '/images/image-manche/neck_guitar.gif';



// cordes en y           1  2   3   4   5   6              
let alignement_note_y = [38,68,100,130,161,194];

// numeros case note     1    2   3   4   5   6   7   8   9   10  11  12  13   14   15    16   17   18   19    20    
let alignement_note_x = [100,177,252,330,407,485,560,635,713,789,865,940, 1015, 1092,1164,1240,1316,1395, 1468,1544];
let alignement_note_x_guitar = 35;

let alignement_frette_y = 0;
//                          3   5   7   9   12  15   17   19   21
let alignement_frette_x = [255,405,560,710,935,1165,1318,1470,1610];
let alignement_frette_x_guitar = 35;

let arr_num_frette = [num_fret_3,num_fret_5,num_fret_7,num_fret_9,
                      num_fret_12,num_fret_15,num_fret_17,num_fret_19,
                      num_fret_21];



//let alignement_mode_x = [104,180,256,332,408,484,560,636,712];

let arr_note_gif = [];


var canvas = null;
var context = null;


class Canvas extends Component{
  constructor(props){
      super(props);
      this.state = {
        isLapsteel:true,
        inputAccordage:this.props.inputAccordage,
        closeModalAjoutMode:false,
        ajoutMode:"",
        ajoutInterval:"",
        errorAjoutMode:false,
        successAddMode:false,
        localAddMode:[],
        saveLocalStorage:[],
        localStorageArray:[],
        numModeState:[]
      }
  }

    verification_input_accordage(input_v){
      let regex =  /([A-G]|[ACDFG]#)([A-G]|[ACDFG]#){4}([A-G]|[ACDFG]#)$/;
      let input = input_v.split(' ').join('').trim().toUpperCase().match(regex);
      if(input === null){
        return false;
      }else{
      return input[0];
      }
    }

    conversion_accordage(input_v){
      const input = input_v.trim().split('');
      let arr = [];
      for(let i = 0; i < input.length; i++){
          if(input[i+1] === '#'){
              arr.push(input[i] + input[i+1]);
          
          }else if(input[i] === '#'){
              continue;
      
          }else{
              arr.push(input[i]);
          }
      }

      return arr.reverse();
  }

    verification_input_tonique(input_t){
      let regex =  /([A-G]|[ACDFG]#)$/;
      let input = input_t.trim().toUpperCase().match(regex);
      if(input === null){
        return false;
      }else{
      return input[0];
      }
  }

    construction_gamme_tonique(input_g){
      let arr = [];
      if(data.notes.includes(input_g)){
          let index = data.notes.indexOf(input_g);
          for(let i = index; i < data.notes.length; i++){
            arr.push(data.notes[i]);     
          }
          
          if(data.notes.length - index !== data.notes.length){
            for(let i = 0; i < index; i++){
              arr.push(data.notes[i]);     
            }
          }
      }
      return arr.join(',').split(',');
    }

    modeCompteur = (mode) => { 
    return mode
      .replace(/\s/g, '').split('T').join('T ').trim()
      .split(' ')
      .map(item => Number.parseFloat(item.substr(0, item.length - 1) * 2))
    }
    
  constructionGammeMode(modeNum, gammeTonique){

    let arr = [];
    arr.push(gammeTonique[0]);
    let count = 0;
    for(let i = 0; i <= modeNum.length - 1; i++){
      arr.push(gammeTonique[modeNum[i] + count]);
      count += modeNum[i];
    }

    return arr;
  }

  constructionNotesFinales(mancheGuitare,gammeMode){
    
    let mancheGuitareFinale = [];

    for(let i = 0; i < mancheGuitare.length; i++){
      let arr = [];
      for(let j = 0; j < mancheGuitare[i].length; j++){

      gammeMode.includes(mancheGuitare[i][j]) ? arr.push(mancheGuitare[i][j]) : arr.push("");
      }
      mancheGuitareFinale.push(arr.slice(1,-1));
    }
    return mancheGuitareFinale;
  }

  lancer = () => {

   
    context.clearRect(0, 0, canvas.width, canvas.height);

    const { inputAccordage, inputTonique, inputMode} = this.props;

    data.mancheGuitare = [];
    data.notesFinales = [];

 
    let inputIsVerified_accordage = this.verification_input_accordage(inputAccordage);
    let inputIsVerified_tonique = this.verification_input_tonique(inputTonique);

    if(inputIsVerified_accordage !== false && inputIsVerified_tonique !== false){
      data.accordage = this.conversion_accordage(inputIsVerified_accordage); 
      data.tonique = inputIsVerified_tonique;
      data.modeNum = this.modeCompteur(inputMode);
      this.setState({numModeState:data.modeNum})
      data.gammeTonique = this.construction_gamme_tonique(data.tonique);
      data.gammeMode = this.constructionGammeMode(data.modeNum, data.gammeTonique);
      // alimente l'objet data.accordage
      const accordage = data.accordage.map((item) => this.construction_gamme_tonique(item));
      // alimente l'objet data.mancheGuitare
      accordage.map((arr) => data.mancheGuitare.push(arr));
      data.notesFinales  = this.constructionNotesFinales(data.mancheGuitare, data.gammeMode);
      arr_note_gif = [];
      

      let line = [];
      for(let i = 0; i < data.notesFinales.length; i++){
          for(let j = 0; j < data.notesFinales[i].length; j++){
                  if(data.notesFinales[i][j] === 'C'){
                    if(data.tonique ==='C'){
                      line.push(c_tonique);
                    }else{
                      line.push(c);
                    }
                  }else if(data.notesFinales[i][j] === 'C#'){
                    if(data.tonique ==='C#'){
                      line.push(cd_tonique);
                    }else{
                      line.push(cd);
                    }
                  }else if(data.notesFinales[i][j] === 'D'){
                    if(data.tonique ==='D'){
                      line.push(d_tonique);
                    }else{
                      line.push(d);
                    }
                  }else if(data.notesFinales[i][j] === 'D#'){
                    if(data.tonique ==='D#'){
                      line.push(dd_tonique);
                    }else{
                      line.push(dd);
                    }
                  }else if(data.notesFinales[i][j] === 'E'){
                    if(data.tonique ==='E'){
                      line.push(e_tonique);
                    }else{
                      line.push(e);
                    }
                  }else if(data.notesFinales[i][j] === 'F'){
                    if(data.tonique ==='F'){
                      line.push(f_tonique);
                    }else{
                      line.push(f);
                    }
                  }else if(data.notesFinales[i][j] === 'F#'){
                    if(data.tonique ==='F#'){
                      line.push(fd_tonique);
                    }else{
                      line.push(fd);
                    }
                  }else if(data.notesFinales[i][j] === 'G'){
                    if(data.tonique ==='G'){
                      line.push(g_tonique);
                    }else{
                      line.push(g);
                    }
                  }else if(data.notesFinales[i][j] === 'G#'){
                    if(data.tonique ==='G#'){
                      line.push(gd_tonique);
                    }else{
                      line.push(gd);
                    }
                  }else if(data.notesFinales[i][j] === 'A'){
                    if(data.tonique ==='A'){
                      line.push(a_tonique);
                    }else{
                      line.push(a);
                    }
                  }else if(data.notesFinales[i][j] === 'A#'){
                    if(data.tonique ==='A#'){
                      line.push(ad_tonique);
                    }else{
                      line.push(adi);
                    }
                  }else if(data.notesFinales[i][j] === 'B'){
                    if(data.tonique ==='B'){
                      line.push(b_tonique);
                    }else{
                      line.push(b);
                    }
                  }else if(data.notesFinales[i][j] === ''){
                      line.push(vide);
                  }
    
              if(j >= 21){
                  arr_note_gif.push(line);
                  line = [];
              }
          }
      }
   
     this.init();

 
 
    }else{
      $('.alert-saisie-accordage').show();
      context.drawImage(guitar_bg,0,0);
    }

  }



  initialisation = () => {

    $('.alert-saisie-accordage').hide();
    $('.alert-ajout-mode').hide();
    $('.alert-modeAjout-mode').hide();
    $('.alert-doublon-modeAjout-mode').hide();
    $('.alert-suppression-mode').hide();
    $('.alert-error-rename-modeAjout-mode').hide();
    $('.alert-doublon-modeAjout-mode').hide();
    $('.alert-rename-modeAjout-mode').hide();
    let widthEcran = window.screen.availWidth;

    //image du manche de la guitare
    if(widthEcran < 1000){
      guitar_bg.src = '/images/image-manche/neck_guitar_mobile.gif';
    }else{
      guitar_bg.src = '/images/image-manche/neck_guitar.gif';
    }
    

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    guitar_bg.onload = () => {
      canvas.width = guitar_bg.naturalWidth
      canvas.height = guitar_bg.naturalHeight
      context.drawImage(guitar_bg,0,0);
      context.drawImage(guitar_bg,0,0);
      this.generator_frette();
    }

    this.setState({localStorageArray:this.props.localStorageArray});
  }


  generator_frette = () => {
    //affiche les images frettes
    for(let j = 0; j < alignement_frette_x.length; j++){
      context.drawImage(arr_num_frette[j], this.state.isLapsteel ? alignement_frette_x[j] : alignement_frette_x[j] - alignement_frette_x_guitar, alignement_frette_y);
    }
  }

  init = () => {

    context.drawImage(guitar_bg,0,0);
    this.generator_frette();

    //affiche les notes 
     for(let i = 0; i < 21; i++){
      for(let j = 0; j < alignement_note_y.length; j++){
        if(arr_note_gif[j] !== undefined){
          context.drawImage(arr_note_gif[j][i], (this.state.isLapsteel ? alignement_note_x[i] : alignement_note_x[i] + alignement_note_x_guitar - 70), alignement_note_y[j]);
        } 
      }
    }

      // affichage de l'accordage sur le manche
  let alignement_note_manche_x = 5;
  for(let i = 0; i < data.accordage.length; i++){
    if(data.accordage[i] === 'C'){
      context.drawImage(c_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'C#'){
      context.drawImage(cd_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'D'){  
      context.drawImage(d_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'D#'){
      context.drawImage(dd_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'E'){
      context.drawImage(e_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'F'){
      context.drawImage(f_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'F#'){
      context.drawImage(fd_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'G'){
      context.drawImage(g_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'G#'){
      context.drawImage(gd_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'A'){
      context.drawImage(a_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'A#'){
      context.drawImage(ad_manche,alignement_note_manche_x, alignement_note_y[i]);
    }else if(data.accordage[i] === 'B'){
      context.drawImage(b_manche,alignement_note_manche_x, alignement_note_y[i]);
    }
  }

    
  }

  isTheSameAddMode = (obj) => {
    let nameMode = [];
    let nameModeLocalStorage = [];
    if(this.hasDataInLocalStorage().length > 0){
      
      let dataLocalStorage = JSON.parse(window.localStorage.getItem('objetAjoutMode'));;
      for(let i in dataLocalStorage){
        let objet = dataLocalStorage[i];
        nameModeLocalStorage.push(Object.keys(objet)[0]);
      }
    }
    

    for(let i in data.verifySameAddMode){
      nameMode.push(Object.keys(data.verifySameAddMode[i])[0]);
    }

  
    if(!nameMode.includes(Object.keys(obj)[0]) && !nameModeLocalStorage.includes(Object.keys(obj)[0])){
      data.verifySameAddMode.push(obj);
      this.setState(state => {const localAddMode = [...state.localAddMode, obj];return {localAddMode}});

      this.setState({ajoutInterval:"",ajoutMode:""});
      $('.alert-modeAjout-mode').show();
      setTimeout(() => {$('.alert-modeAjout-mode').hide();this.setState({successAddMode:true})}, 3000);

    }else{
      $('.alert-doublon-modeAjout-mode').show();this.setState({ajoutInterval:"",ajoutMode:""})
      setTimeout(() => { $('.alert-doublon-modeAjout-mode').hide();}, 3000);
    }
  }


  //Ajout d'un mode en ouvrant une MODAL
  add_mode = () => {
 
    //saisie du champs nom
    let nomAjoutMode = this.state.ajoutMode;
    nomAjoutMode = nomAjoutMode.trim();

    //saisie du champs interval
    let intervalAjoutMode = this.state.ajoutInterval;
    intervalAjoutMode = intervalAjoutMode.toUpperCase();


    if(nomAjoutMode !== "" && intervalAjoutMode !== ""){

      //si le local Storage possede au moins un mode
      if(this.hasDataInLocalStorage().length > 0){
        this.isTheSameAddMode({[`${nomAjoutMode}`]:intervalAjoutMode});
       
      // //si le local Storage ne possede rien
      }else if(data.verifySameAddMode.length < 1){
          data.verifySameAddMode.push({[`${nomAjoutMode}`]:intervalAjoutMode});
          this.setState(state => {const localAddMode = [...state.localAddMode, {[`${nomAjoutMode}`]:intervalAjoutMode}];return {localAddMode}});
          this.setState({ajoutInterval:"",ajoutMode:""});
          $('.alert-modeAjout-mode').show();
          
          setTimeout(() => {$('.alert-modeAjout-mode').hide();}, 3000);
    
      }else{this.isTheSameAddMode({[`${nomAjoutMode}`]:intervalAjoutMode});}
    }else{
      $('.alert-ajout-mode').show();
      setTimeout( () => {
        $('.alert-ajout-mode').hide();
      },3000); 
    }

  }



  hasDataInLocalStorage = () => {

    let obj = JSON.parse(window.localStorage.getItem('objetAjoutMode'));
  
    let count = [];
    for(let i in obj){
      count.push(i);
    }

    return count;
  }

  componentDidUpdate(prevProps, prevState){
    
    if(prevProps.isLapsteel !== this.props.isLapsteel){
      this.setState({isLapsteel:this.props.isLapsteel});
    }else if(prevProps.inputAccordage !== this.props.inputAccordage){
      $('.alert-saisie-accordage').hide();
      context.drawImage(guitar_bg,0,0);
      this.generator_frette();
    }else if(prevState.localAddMode !== this.state.localAddMode){
      this.setState({localAddMode:data.verifySameAddMode})
    }
  }

  handleOnChangeAddMode = (event) => {
    switch (event.target.id) {
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


  componentDidMount(){
    this.initialisation();
  }

  closeModalAjoutMode = () => {
    this.setState({ajoutMode:"",ajoutInterval:""});
    this.saveModetoLocalStorage();
  }

  closeModalDeleteMode = () => {
    let select_mode_interval_delete = 'interval-mode-list';
    this.props.isCloseModalDeleteMode(false);
    this.saveModetoLocalStorage(select_mode_interval_delete);
  }
  



  cancelModalAddMode = () => {
    this.setState({ajoutInterval:"",ajoutMode:"", localAddMode:[]});
  }

  saveModetoLocalStorage = (id_mode) => {
    let array = [];
    let localStorage = JSON.parse(window.localStorage.getItem('objetAjoutMode'));
    

    if(localStorage !== null && this.state.localAddMode.length !== 0){

      for(let i in this.state.localAddMode){
        array.push(this.state.localAddMode[i]);
      }
      for(let i in localStorage){
        array.push(localStorage[i]);
      }

      window.localStorage.setItem('objetAjoutMode', JSON.stringify(array));
      this.props.dispatchLocalStorageMode(array);

    }else if(this.state.localAddMode.length > 0){

      this.setState({saveLocalStorage:this.state.localAddMode});
      window.localStorage.setItem('objetAjoutMode', JSON.stringify(this.state.localAddMode));
     
      this.props.dispatchLocalStorageMode(this.state.localAddMode);
      
    }
    this.setState({saveLocalStorage:"",localAddMode:""});
    data.verifySameAddMode = [];
  }


  selectAddModeBtn = (event) => {
    let ajoutInterval = this.state.ajoutInterval.length > 0 ? this.state.ajoutInterval + " " : this.state.ajoutInterval;
    switch (event.target.value) {
      case "0.5T":
      
        this.setState({ajoutInterval:ajoutInterval + event.target.value})
        break;

      case "1T":
       
        this.setState({ajoutInterval:ajoutInterval + event.target.value})
        break;
      
      case "1.5T":
      
        this.setState({ajoutInterval:ajoutInterval + event.target.value})
        break;

      case "X":
        let arrayAjoutMode = this.state.ajoutInterval.split(" ");
        arrayAjoutMode.splice(arrayAjoutMode.length -1, 1);
        this.setState({ajoutInterval:arrayAjoutMode.join(" ")})
        break;
    
      default:
        break;
    }

  }

  




  render(){
 
    const { localStorageArray, selectedModeToDelete, 
            deleteMode, selectedModeToEdit,
            closeModalEditMode, editMode, handleChangeEditMode, isCloseModalDeleteMode, selectEditModeBtn } = this.props;

    const { ajoutInterval, ajoutMode, errorAjoutMode } = this.state;
    if(errorAjoutMode){
      if(ajoutInterval.length > 0 || ajoutMode.length > 0){
        $('.alert-ajout-mode').hide();
        this.setState({errorAjoutMode:false});
      }
    }
    
    let selectOptionsModeList = [];

    if(localStorageArray !== null){
        for(let property in  localStorageArray){
            let name = Object.keys( localStorageArray[property]).join('');
            let interval = Object.values( localStorageArray[property]).join('');
            selectOptionsModeList.push(<option key={name} value={interval}>{name}</option>)
        }
    }
 

      return(
          <div className="container text-center mb-5">
              <div id="display-mode" className="text-center p-5 h2 display-mode-class"></div>
              <canvas id="canvas"></canvas>
              {/*   <!-- Bouton Lancer et Effacer --> */}
              <div className="text-center container mt-3 pb-5">
                  <button type="button" className="btn btn-primary" id="button-lancer" onClick={this.lancer}>Lancer</button>
              </div>


              {/*    <!-- debut Modal Ajout Mode --> */}
              <div className="modal fade" id="ajoutMode" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content">

                    {/*  <!-- Header --> */}
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Ajouter un mode</h5>
                        
                    </div>

                    {/* <!-- Body --> */}
                    <div className="modal-body">
                        {/* <!-- div error si l'utilisateur ne rentre pas d'accordage --> */}
                        <div className="alert alert-warning alert-dismissible fade show container alert-ajout-mode" role="alert">
                            <strong>OOPS!</strong> Il faut saisir les deux champs.
                        </div>

                        <form id='form-id-ajout-mode text-center form-group'>
                            <label>Nom du mode</label>
                            <input name="nom-ajout-mode" id="nom-ajout-mode" value={this.state.ajoutMode} type='text' required='required'
                                className="form-control" onChange={this.handleOnChangeAddMode}/>
                            <div className="mt-3"><label>intervalle des notes</label></div>

                            <div className="btn-group mb-2" role="group" aria-label="Basic example">
                              <button type="button" className="btn btn-outline-primary" value="0.5T" onClick={this.selectAddModeBtn}>0.5T</button>
                              <button type="button" className="btn btn-outline-primary" value="1T" onClick={this.selectAddModeBtn}>1T</button>
                              <button type="button" className="btn btn-outline-primary" value="1.5T" onClick={this.selectAddModeBtn}>1.5T</button>
                              <button type="button" className="btn btn-outline-danger" value="X" onClick={this.selectAddModeBtn}>X</button>
                            </div>

                            <input name="input-interval-mode-added" id="input-interval-mode-added" value={this.state.ajoutInterval} type='text' required='required'
                                className="form-control" onChange={this.handleOnChangeAddMode}/>
                            <div className="pt-3 pb-3">
                                <button type="button" className="btn btn-primary" id="ajouter-mode" onClick={this.add_mode}>Ajouter un mode</button>
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
                        {/* {this.state.ajoutMode !== "" && this.state.ajoutInterval !== "" 
                        ? 
                        <button className="btn btn-primary" data-dismiss="modal" onClick={this.closeModalAjoutMode}>Appliquer</button> 
                        : 
                        <button className="btn btn-secondary">Appliquer</button>} */}
                        {this.state.localAddMode.length > 0 ? 
                        <button className="btn btn-primary" data-dismiss="modal" onClick={this.closeModalAjoutMode}>Appliquer</button> :
                        <button className="btn btn-secondary">Appliquer</button> } 
                        <button className="btn btn-secondary" data-dismiss="modal" onClick={this.cancelModalAddMode}>Annuler</button>
                    </div>
                  </div>
              </div>
          </div>
          {/*  <!-- fin Modal Ajout Mode --> */} 

          {/*     <!-- debut Modal supprimer Mode --> */}
          <div className="modal fade" id="suppressionMode" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">

              {/*    <!-- Header --> */}
              <div className="modal-header">
              <h5 className="modal-title">Supprimer un mode</h5>
              </div>

              {/*  <!-- Body --> */}
              <div className="modal-body">
              <form id='form-id-suppression-mode text-center form-group'>
                <select id="interval-mode-list" name="interval-mode-list" size="1" className="form-control" onChange={selectedModeToDelete}>
                  <option value="default">-- Choisir un mode --</option>
                  {selectOptionsModeList}
                </select>
                <div className="pt-3 pb-3">
                <button type="button" className="btn btn-primary" id="supprimer-mode" onClick={deleteMode}>Supprimer un mode</button>
                </div>
              </form>
              </div>

              <div className="alert alert-warning alert-dismissible fade show container alert-suppression-mode" role="alert">
                <strong>Alerte!</strong> Le mode a été supprimé.
              </div>

              { ((localStorageArray === null) || (localStorageArray.length === 0)) && <div className="alert alert-warning alert-dismissible fade show container alert-error-suppression-mode" role="alert">
                <strong>Alerte!</strong> Rien à supprimer.
              </div>}

              {/*  <!-- Footer --> */}
              <div className="modal-footer">
              <button className="btn btn-secondary" data-dismiss="modal" onClick={isCloseModalDeleteMode}>Fermer</button>
              </div>
            </div>
            </div>
          </div>
          {/*  <!-- fin Modal supprimer Mode --> */}


          {/* <!-- debut Modal modifier Mode --> */}
          <div className="modal fade" id="modifierMode" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">

            {/*   <!-- Header --> */}
              <div className="modal-header">
              <h4 className="modal-title">Modifier un mode</h4>
              </div>

             {/*  <!-- Body --> */}
              <div className="modal-body">
              <form id='form-id-modifier-mode text-center form-group'>
                <label className="h5">Choisir le mode à modifier</label>
                <select id="interval-mode-list-modification" name="interval-mode-list-modification" size="1" className="form-control" onChange={selectedModeToEdit}>
                  <option value="default">-- Choisir un mode --</option>
                  {selectOptionsModeList}
                </select>
            
                <div className="pt-3 pb-3">
                  <div id="resultat-mode-selection" className="h2"></div>
                  <div className="pt-3 pb-3">
                    <label className="h5">nom du mode</label>
                    <input name="nom-modification-mode" id="nom-modification-mode" value={this.props.editNameMode} type='text' required='required' className="form-control" onChange={handleChangeEditMode}/>
                    <div><label className="h5 pt-2">interval du mode</label></div>
                    <div className="btn-group mb-2" role="group" aria-label="Basic example">
                      <button type="button" className="btn btn-outline-primary" id="0.5T" onClick={selectEditModeBtn}>0.5T</button>
                      <button type="button" className="btn btn-outline-primary" id="1T" onClick={selectEditModeBtn}>1T</button>
                      <button type="button" className="btn btn-outline-primary" id="1.5T" onClick={selectEditModeBtn}>1.5T</button>
                      <button type="button" className="btn btn-outline-danger" id="X" onClick={selectEditModeBtn}>X</button>
                    </div>
                    <input name="interval-modification-mode" id="interval-modification-mode" value={this.props.editIntervalMode} type='text' required='required' className="form-control" onChange={handleChangeEditMode}/>
                  </div>

            {  this.props.editNameMode.length > 0 || this.props.editIntervalMode ? <button type="button" className="btn btn-primary" id="modifier-mode" onClick={editMode}>Modifier</button>
            : null}                  
                </div>
              </form>
              </div>

              <div className="alert alert-warning fade show container alert-doublon-modeAjout-mode" role="alert">
                <strong>OOPS!</strong> Enresgitrement déjà existant.
              </div>

              <div className="alert alert-warning fade show container alert-rename-modeAjout-mode" role="alert">
                <strong>Bravo!</strong> Modification effectuée.
              </div>

              <div className="alert alert-warning fade show container alert-error-rename-modeAjout-mode" role="alert">
                <strong>OOPS!</strong> Vérifier les champs à modifier.
              </div>

              {/* <!-- Footer --> */}
              <div className="modal-footer">
              <button className="btn btn-secondary" data-dismiss="modal" onClick={closeModalEditMode}>Fermer</button>
              </div>
            </div>
            </div>
          </div>
            {/* <!-- fin Modal modifier Mode --> */}
        </div>  
      )
  }
}

export default Canvas;