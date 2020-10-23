import React, { Component } from 'react';
import $ from 'jquery';
import './Lapsteelator.css';
import './Canvas.css';



let data = {
  accordage: [],
  tonique: "",
  gammeTonique: [],
  notes: ["C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1", "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A2", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6", "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7"],
  mancheGuitare: [],
  modeNum: [],
  gammeMode: [],
  notesFinales: [],
  localStorageArray: '',
  selectedEditArray: [],
  verifySameAddMode: [],
  addModeTemp: [],
  allNotes: []
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
let alignement_note_y = [38, 68, 100, 130, 161, 194];

// numeros case note     1    2   3   4   5   6   7   8   9   10  11  12  13   14   15    16   17   18   19    20    
let alignement_note_x = [100, 177, 252, 330, 407, 485, 560, 635, 713, 789, 865, 940, 1015, 1092, 1164, 1240, 1316, 1395, 1468, 1544];
let alignement_note_x_guitar = 35;

let alignement_frette_y = 0;
//                          3   5   7   9   12  15   17   19   21
let alignement_frette_x = [255, 405, 560, 710, 935, 1165, 1318, 1470, 1610];
let alignement_frette_x_guitar = 35;

let arr_num_frette = [num_fret_3, num_fret_5, num_fret_7, num_fret_9,
  num_fret_12, num_fret_15, num_fret_17, num_fret_19,
  num_fret_21];



//let alignement_mode_x = [104,180,256,332,408,484,560,636,712];

let arr_note_gif = [];


var canvas = null;
var context = null;


class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLapsteel: true,
      inputAccordage: this.props.inputAccordage,
      closeModalAjoutMode: false,
      ajoutMode: "",
      ajoutInterval: "",
      errorAjoutMode: false,
      successAddMode: false,
      localAddMode: [],
      saveLocalStorage: [],
      localStorageArray: [],
      numModeState: [],
      guitar_bg: '/images/image-manche/neck_guitar.gif',
      guitar_bg_mob: '/images/image-manche/neck_guitar_mobile.gif'
    }
  }


  construction_gamme_tonique(input_g) {
    let arr = [];
    if (data.notes.includes(input_g)) {
      let index = data.notes.indexOf(input_g);
      console.log("input_g : ", input_g, " index : ", index);
      for (let i = index; i < data.notes.length; i++) {
        arr.push(data.notes[i]);
      }

      if (data.notes.length - index !== data.notes.length) {
        for (let i = 0; i < index; i++) {
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

  constructionGammeMode(modeNum, gammeTonique) {

    let arr = [];
    arr.push(gammeTonique[0]);
    let count = 0;
    for (let i = 0; i <= modeNum.length - 1; i++) {
      arr.push(gammeTonique[modeNum[i] + count]);
      count += modeNum[i];
    }

    return arr;
  }

  filterNotes(array) {
    let newNote = array.map(note => {
      let a = note.split("");
      a.pop();
      return a.join("");
    });
    return newNote;
  }


  constructionNotesFinales(mancheGuitare, gammeMode) {

    let mancheGuitareFinale = [];
    const gammeModeFiltered = this.filterNotes(gammeMode);

    for (let i = 0; i < mancheGuitare.length; i++) {
      let arr = [];
      for (let j = 0; j <= mancheGuitare[i].length; j++) {
        console.log(mancheGuitare[i].length);
        const notesFiltered = this.filterNotes(mancheGuitare[i])
        gammeModeFiltered.includes(notesFiltered[j]) ? arr.push(mancheGuitare[i][j]) : arr.push("");
      }
      mancheGuitareFinale.push(arr.slice(1, -1));
    }
    return mancheGuitareFinale;
  }

  lancer = () => {


    context.clearRect(0, 0, canvas.width, canvas.height);

    const { inputAccordage, inputTonique, inputMode } = this.props;



    data.mancheGuitare = [];
    data.notesFinales = [];

    data.accordage = inputAccordage.trim().split(" ");
    data.tonique = inputTonique;
    data.modeNum = this.modeCompteur(inputMode);
    this.setState({ numModeState: data.modeNum })

    data.gammeTonique = this.construction_gamme_tonique(data.tonique);

    data.gammeMode = this.constructionGammeMode(data.modeNum, data.gammeTonique);
    // alimente l'objet data.accordage
    const accordage = data.accordage.map((item) => this.construction_gamme_tonique(item));

    // alimente l'objet data.mancheGuitare

    accordage.map((arr) => data.mancheGuitare.push(arr));

    const index = 21;

    for (let i = 0; i < data.mancheGuitare.length; i++) {
      data.mancheGuitare[i].splice(index, data.mancheGuitare[i].length - index);
    }



    data.notesFinales = this.constructionNotesFinales(data.mancheGuitare, data.gammeMode);

    data.notesFinales.reverse();

    arr_note_gif = [];


    let line = [];

    for (let i = 0; i < data.notesFinales.length; i++) {
      for (let j = 0; j <= data.notesFinales[i].length; j++) {

        if (data.notesFinales[i][j] === 'C1' || data.notesFinales[i][j] === 'C2' || data.notesFinales[i][j] === 'C3' || data.notesFinales[i][j] === 'C4' || data.notesFinales[i][j] === 'C5' || data.notesFinales[i][j] === 'C6' || data.notesFinales[i][j] === 'C7') {
          if (data.tonique === 'C1' || data.tonique === 'C2' || data.tonique === 'C3' || data.tonique === 'C4' || data.tonique === 'C5' || data.tonique === 'C6' || data.tonique === 'C7') {
            line.push(c_tonique);
          } else {
            line.push(c);
          }
        } else if (data.notesFinales[i][j] === 'C#1' || data.notesFinales[i][j] === 'C#2' || data.notesFinales[i][j] === 'C#3' || data.notesFinales[i][j] === 'C#4' || data.notesFinales[i][j] === 'C#5' || data.notesFinales[i][j] === 'C#6' || data.notesFinales[i][j] === 'C#7') {
          if (data.tonique === 'C#1' || data.tonique === 'C#2' || data.tonique === 'C#3' || data.tonique === 'C#4' || data.tonique === 'C#5' || data.tonique === 'C#6' || data.tonique === 'C#7') {
            line.push(cd_tonique);
          } else {
            line.push(cd);
          }
        } else if (data.notesFinales[i][j] === 'D1' || data.notesFinales[i][j] === 'D2' || data.notesFinales[i][j] === 'D3' || data.notesFinales[i][j] === 'D4' || data.notesFinales[i][j] === 'D5' || data.notesFinales[i][j] === 'D6' || data.notesFinales[i][j] === 'D7') {
          if (data.tonique === 'D1' || data.tonique === 'D2' || data.tonique === 'D3' || data.tonique === 'D4' || data.tonique === 'D5' || data.tonique === 'D6' || data.tonique === 'D7') {
            line.push(d_tonique);
          } else {
            line.push(d);
          }
        } else if (data.notesFinales[i][j] === 'D#1' || data.notesFinales[i][j] === 'D#2' || data.notesFinales[i][j] === 'D#3' || data.notesFinales[i][j] === 'D#4' || data.notesFinales[i][j] === 'D#5' || data.notesFinales[i][j] === 'D#6' || data.notesFinales[i][j] === 'D#7') {
          if (data.tonique === 'D#1' || data.tonique === 'D#2' || data.tonique === 'D#3' || data.tonique === 'D#4' || data.tonique === 'D#5' || data.tonique === 'D#6' || data.tonique === 'D#7') {
            line.push(dd_tonique);
          } else {
            line.push(dd);
          }
        } else if (data.notesFinales[i][j] === 'E1' || data.notesFinales[i][j] === 'E2' || data.notesFinales[i][j] === 'E3' || data.notesFinales[i][j] === 'E4' || data.notesFinales[i][j] === 'E5' || data.notesFinales[i][j] === 'E6' || data.notesFinales[i][j] === 'E7') {
          if (data.tonique === 'E1' || data.tonique === 'E2' || data.tonique === 'E3' || data.tonique === 'E4' || data.tonique === 'E5' || data.tonique === 'E6' || data.tonique === 'E7') {
            line.push(e_tonique);
          } else {
            line.push(e);
          }
        } else if (data.notesFinales[i][j] === 'F1' || data.notesFinales[i][j] === 'F2' || data.notesFinales[i][j] === 'F3' || data.notesFinales[i][j] === 'F4' || data.notesFinales[i][j] === 'F5' || data.notesFinales[i][j] === 'F6' || data.notesFinales[i][j] === 'F7') {

          if (data.tonique === 'F1' || data.tonique === 'F2' || data.tonique === 'F3' || data.tonique === 'F4' || data.tonique === 'F5' || data.tonique === 'F6' || data.tonique === 'F7') {
            line.push(f_tonique);
          } else {
            line.push(f);
          }
        } else if (data.notesFinales[i][j] === 'F#1' || data.notesFinales[i][j] === 'F#2' || data.notesFinales[i][j] === 'F#3' || data.notesFinales[i][j] === 'F#4' || data.notesFinales[i][j] === 'F#5' || data.notesFinales[i][j] === 'F#6' || data.notesFinales[i][j] === 'F#7') {
          if (data.tonique === 'F#1' || data.tonique === 'F#2' || data.tonique === 'F#3' || data.tonique === 'F#4' || data.tonique === 'F#5' || data.tonique === 'F#6' || data.tonique === 'F#7') {
            line.push(fd_tonique);
          } else {
            line.push(fd);
          }
        } else if (data.notesFinales[i][j] === 'G1' || data.notesFinales[i][j] === 'G2' || data.notesFinales[i][j] === 'G3' || data.notesFinales[i][j] === 'G4' || data.notesFinales[i][j] === 'G5' || data.notesFinales[i][j] === 'G6' || data.notesFinales[i][j] === 'G7') {

          if (data.tonique === 'G1' || data.tonique === 'G2' || data.tonique === 'G3' || data.tonique === 'G4' || data.tonique === 'G5' || data.tonique === 'G6' || data.tonique === 'G7') {
            line.push(g_tonique);

          } else {
            line.push(g);

          }
        } else if (data.notesFinales[i][j] === 'G#1' || data.notesFinales[i][j] === 'G#2' || data.notesFinales[i][j] === 'G#3' || data.notesFinales[i][j] === 'G#4' || data.notesFinales[i][j] === 'G#5' || data.notesFinales[i][j] === 'G#6' || data.notesFinales[i][j] === 'G#7') {
          if (data.tonique === 'G#1' || data.tonique === 'G#2' || data.tonique === 'G#3' || data.tonique === 'G#4' || data.tonique === 'G#5' || data.tonique === 'G#6' || data.tonique === 'G#7') {
            line.push(gd_tonique);
          } else {
            line.push(gd);
          }
        } else if (data.notesFinales[i][j] === 'A1' || data.notesFinales[i][j] === 'A2' || data.notesFinales[i][j] === 'A3' || data.notesFinales[i][j] === 'A4' || data.notesFinales[i][j] === 'A5' || data.notesFinales[i][j] === 'A6' || data.notesFinales[i][j] === 'A7') {
          if (data.tonique === 'A1' || data.tonique === 'A2' || data.tonique === 'A3' || data.tonique === 'A4' || data.tonique === 'A5' || data.tonique === 'A6' || data.tonique === 'A7') {
            line.push(a_tonique);
          } else {
            line.push(a);
          }
        } else if (data.notesFinales[i][j] === 'A#1' || data.notesFinales[i][j] === 'A#2' || data.notesFinales[i][j] === 'A#3' || data.notesFinales[i][j] === 'A#4' || data.notesFinales[i][j] === 'A#5' || data.notesFinales[i][j] === 'A#6' || data.notesFinales[i][j] === 'A#7') {
          if (data.tonique === 'A#1' || data.notesFinales[i][j] === 'A#2' || data.notesFinales[i][j] === 'A#3' || data.notesFinales[i][j] === 'A#4' || data.notesFinales[i][j] === 'A#5' || data.notesFinales[i][j] === 'A#6' || data.notesFinales[i][j] === 'A#7') {
            line.push(ad_tonique);
          } else {
            line.push(adi);
          }
        } else if (data.notesFinales[i][j] === 'B1' || data.notesFinales[i][j] === 'B2' || data.notesFinales[i][j] === 'B3' || data.notesFinales[i][j] === 'B4' || data.notesFinales[i][j] === 'B5' || data.notesFinales[i][j] === 'B6' || data.notesFinales[i][j] === 'B7') {
          if (data.tonique === 'B1' || data.notesFinales[i][j] === 'B2' || data.notesFinales[i][j] === 'B3' || data.notesFinales[i][j] === 'B4' || data.notesFinales[i][j] === 'B5' || data.notesFinales[i][j] === 'B6' || data.notesFinales[i][j] === 'B7') {
            line.push(b_tonique);
          } else {
            line.push(b);
          }
        } else if (data.notesFinales[i][j] === '') {
          line.push(vide);
        }

        if (j >= 20) {
          arr_note_gif.push(line);
          line = [];
        }
      }
    }


    this.init();

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


    this.screenCalibrate();

    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    guitar_bg.onload = () => {
      canvas.width = guitar_bg.naturalWidth
      canvas.height = guitar_bg.naturalHeight
      context.drawImage(guitar_bg, 0, 0);
      context.drawImage(guitar_bg, 0, 0);
      this.generator_frette();
    }

    this.setState({ localStorageArray: this.props.localStorageArray });
  }


  generator_frette = () => {
    //affiche les images frettes
    for (let j = 0; j < alignement_frette_x.length; j++) {
      context.drawImage(arr_num_frette[j], this.state.isLapsteel ? alignement_frette_x[j] : alignement_frette_x[j] - alignement_frette_x_guitar, alignement_frette_y);
    }
  }

  init = () => {

    context.drawImage(guitar_bg, 0, 0);
    this.generator_frette();

    //affiche les notes 
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < alignement_note_y.length; j++) {
        if (arr_note_gif[j] !== undefined) {
          context.drawImage(arr_note_gif[j][i], (this.state.isLapsteel ? alignement_note_x[i] : alignement_note_x[i] + alignement_note_x_guitar - 70), alignement_note_y[j]);
        }
      }
    }

    data.accordage.reverse();

    // affichage de l'accordage sur le manche
    let alignement_note_manche_x = 5;
    for (let i = 0; i < data.accordage.length; i++) {
      if (data.accordage[i] === 'C1' || data.accordage[i] === 'C2' || data.accordage[i] === 'C3' || data.accordage[i] === 'C4' || data.accordage[i] === 'C5' || data.accordage[i] === 'C6' || data.accordage[i] === 'C7') {
        context.drawImage(c_manche, alignement_note_manche_x, alignement_note_y[i]);
      } else if (data.accordage[i] === 'C#1' || data.accordage[i] === 'C#2' || data.accordage[i] === 'C#3' || data.accordage[i] === 'C#4' || data.accordage[i] === 'C#5' || data.accordage[i] === 'C#6' || data.accordage[i] === 'C#7') {
        context.drawImage(cd_manche, alignement_note_manche_x, alignement_note_y[i]);
      } else if (data.accordage[i] === 'D1' || data.accordage[i] === 'D2' || data.accordage[i] === 'D3' || data.accordage[i] === 'D4' || data.accordage[i] === 'D5' || data.accordage[i] === 'D6' || data.accordage[i] === 'D7') {
        context.drawImage(d_manche, alignement_note_manche_x, alignement_note_y[i]);
      } else if (data.accordage[i] === 'D#1' || data.accordage[i] === 'D#2' || data.accordage[i] === 'D#3' || data.accordage[i] === 'D#4' || data.accordage[i] === 'D#5' || data.accordage[i] === 'D#6' || data.accordage[i] === 'D#7') {
        context.drawImage(dd_manche, alignement_note_manche_x, alignement_note_y[i]);
      } else if (data.accordage[i] === 'E1' || data.accordage[i] === 'E2' || data.accordage[i] === 'E3' || data.accordage[i] === 'E4' || data.accordage[i] === 'E5' || data.accordage[i] === 'E6' || data.accordage[i] === 'E7') {
        context.drawImage(e_manche, alignement_note_manche_x, alignement_note_y[i]);
      } else if (data.accordage[i] === 'F1' || data.accordage[i] === 'F2' || data.accordage[i] === 'F3' || data.accordage[i] === 'F4' || data.accordage[i] === 'F5' || data.accordage[i] === 'F6' || data.accordage[i] === 'F7') {
        context.drawImage(f_manche, alignement_note_manche_x, alignement_note_y[i]);
      } else if (data.accordage[i] === 'F#1' || data.accordage[i] === 'F#2' || data.accordage[i] === 'F#3' || data.accordage[i] === 'F#4' || data.accordage[i] === 'F#5' || data.accordage[i] === 'F#6' || data.accordage[i] === 'F#7') {
        context.drawImage(fd_manche, alignement_note_manche_x, alignement_note_y[i]);
      } else if (data.accordage[i] === 'G1' || data.accordage[i] === 'G2' || data.accordage[i] === 'G3' || data.accordage[i] === 'G4' || data.accordage[i] === 'G5' || data.accordage[i] === 'G6' || data.accordage[i] === 'G7') {
        context.drawImage(g_manche, alignement_note_manche_x, alignement_note_y[i]);
      } else if (data.accordage[i] === 'G#1' || data.accordage[i] === 'G#2' || data.accordage[i] === 'G#3' || data.accordage[i] === 'G#4' || data.accordage[i] === 'G#5' || data.accordage[i] === 'G#6' || data.accordage[i] === 'G#7') {
        context.drawImage(gd_manche, alignement_note_manche_x, alignement_note_y[i]);
      } else if (data.accordage[i] === 'A1' || data.accordage[i] === 'A2' || data.accordage[i] === 'A3' || data.accordage[i] === 'A4' || data.accordage[i] === 'A5' || data.accordage[i] === 'A6' || data.accordage[i] === 'A7') {
        context.drawImage(a_manche, alignement_note_manche_x, alignement_note_y[i]);
      } else if (data.accordage[i] === 'A#1' || data.accordage[i] === 'A#2' || data.accordage[i] === 'A#3' || data.accordage[i] === 'A#4' || data.accordage[i] === 'A#5' || data.accordage[i] === 'A#6' || data.accordage[i] === 'A#7') {
        context.drawImage(ad_manche, alignement_note_manche_x, alignement_note_y[i]);
      } else if (data.accordage[i] === 'B1' || data.accordage[i] === 'B2' || data.accordage[i] === 'B3' || data.accordage[i] === 'B4' || data.accordage[i] === 'B5' || data.accordage[i] === 'B6' || data.accordage[i] === 'B7') {
        context.drawImage(b_manche, alignement_note_manche_x, alignement_note_y[i]);
      }
    }


  }

  isTheSameAddMode = (obj) => {
    let nameMode = [];
    let nameModeLocalStorage = [];
    if (this.hasDataInLocalStorage().length > 0) {

      let dataLocalStorage = JSON.parse(window.localStorage.getItem('objetAjoutMode'));;
      for (let i in dataLocalStorage) {
        let objet = dataLocalStorage[i];
        nameModeLocalStorage.push(Object.keys(objet)[0]);
      }
    }


    for (let i in data.verifySameAddMode) {
      nameMode.push(Object.keys(data.verifySameAddMode[i])[0]);
    }


    if (!nameMode.includes(Object.keys(obj)[0]) && !nameModeLocalStorage.includes(Object.keys(obj)[0])) {
      data.verifySameAddMode.push(obj);
      this.setState(state => { const localAddMode = [...state.localAddMode, obj]; return { localAddMode } });

      this.setState({ ajoutInterval: "", ajoutMode: "" });
      $('.alert-modeAjout-mode').show();
      setTimeout(() => { $('.alert-modeAjout-mode').hide(); this.setState({ successAddMode: true }) }, 3000);

    } else {
      $('.alert-doublon-modeAjout-mode').show(); this.setState({ ajoutInterval: "", ajoutMode: "" })
      setTimeout(() => { $('.alert-doublon-modeAjout-mode').hide(); }, 3000);
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


    if (nomAjoutMode !== "" && intervalAjoutMode !== "") {

      //si le local Storage possede au moins un mode
      if (this.hasDataInLocalStorage().length > 0) {
        this.isTheSameAddMode({ [`${nomAjoutMode}`]: intervalAjoutMode });

        // //si le local Storage ne possede rien
      } else if (data.verifySameAddMode.length < 1) {
        data.verifySameAddMode.push({ [`${nomAjoutMode}`]: intervalAjoutMode });
        this.setState(state => { const localAddMode = [...state.localAddMode, { [`${nomAjoutMode}`]: intervalAjoutMode }]; return { localAddMode } });
        this.setState({ ajoutInterval: "", ajoutMode: "" });
        $('.alert-modeAjout-mode').show();

        setTimeout(() => { $('.alert-modeAjout-mode').hide(); }, 3000);

      } else { this.isTheSameAddMode({ [`${nomAjoutMode}`]: intervalAjoutMode }); }
    } else {
      $('.alert-ajout-mode').show();
      setTimeout(() => {
        $('.alert-ajout-mode').hide();
      }, 3000);
    }

  }



  hasDataInLocalStorage = () => {

    let obj = JSON.parse(window.localStorage.getItem('objetAjoutMode'));

    let count = [];
    for (let i in obj) {
      count.push(i);
    }

    return count;
  }


  screenCalibrate = () => {
    let widthEcran = window.screen.availWidth;

    //image du manche de la guitare
    if (widthEcran < 1000) {
      guitar_bg.src = this.state.guitar_bg_mob;
    } else {

      if (this.props.inputAccordage.split(" ").length === 1) {
        guitar_bg.src = '/images/image-manche/neck_guitar_1_corde.gif';
      }
      if (this.props.inputAccordage.split(" ").length === 2) {
        guitar_bg.src = '/images/image-manche/neck_guitar_2_corde.gif';
      }
      if (this.props.inputAccordage.split(" ").length === 3) {
        guitar_bg.src = '/images/image-manche/neck_guitar_3_corde.gif';
      }
      if (this.props.inputAccordage.split(" ").length === 4) {
        guitar_bg.src = '/images/image-manche/neck_guitar_4_corde.gif';
      }

      if (this.props.inputAccordage.length === 0 || this.props.inputAccordage.split(" ").length  === 5) {
        guitar_bg.src = this.state.guitar_bg;
      }
    }

  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.isLapsteel !== this.props.isLapsteel) {
      this.setState({ isLapsteel: this.props.isLapsteel });
    } else if (prevProps.inputAccordage !== this.props.inputAccordage) {
      $('.alert-saisie-accordage').hide();
      context.drawImage(guitar_bg, 0, 0);
      this.screenCalibrate();
      this.generator_frette();
    } else if (prevState.localAddMode !== this.state.localAddMode) {
      this.setState({ localAddMode: data.verifySameAddMode })
    }
  }

  handleOnChangeAddMode = (event) => {
    switch (event.target.id) {
      case 'nom-ajout-mode':
        this.setState({ ajoutMode: event.target.value });
        break;
      case 'input-interval-mode-added':
        this.setState({ ajoutInterval: event.target.value });
        break;
      default:
        break;
    }
  }


  componentDidMount() {
    this.initialisation();

  }

  closeModalAjoutMode = () => {
    this.setState({ ajoutMode: "", ajoutInterval: "" });
    this.saveModetoLocalStorage();
  }

  closeModalDeleteMode = () => {
    let select_mode_interval_delete = 'interval-mode-list';
    this.props.isCloseModalDeleteMode(false);
    this.saveModetoLocalStorage(select_mode_interval_delete);
  }




  cancelModalAddMode = () => {
    this.setState({ ajoutInterval: "", ajoutMode: "", localAddMode: [] });
  }

  saveModetoLocalStorage = (id_mode) => {
    let array = [];
    let localStorage = JSON.parse(window.localStorage.getItem('objetAjoutMode'));


    if (localStorage !== null && this.state.localAddMode.length !== 0) {

      for (let i in this.state.localAddMode) {
        array.push(this.state.localAddMode[i]);
      }
      for (let i in localStorage) {
        array.push(localStorage[i]);
      }

      window.localStorage.setItem('objetAjoutMode', JSON.stringify(array));
      this.props.dispatchLocalStorageMode(array);

    } else if (this.state.localAddMode.length > 0) {

      this.setState({ saveLocalStorage: this.state.localAddMode });
      window.localStorage.setItem('objetAjoutMode', JSON.stringify(this.state.localAddMode));

      this.props.dispatchLocalStorageMode(this.state.localAddMode);

    }
    this.setState({ saveLocalStorage: "", localAddMode: "" });
    data.verifySameAddMode = [];
  }


  selectAddModeBtn = (event) => {
    let ajoutInterval = this.state.ajoutInterval.length > 0 ? this.state.ajoutInterval + " " : this.state.ajoutInterval;
    switch (event.target.value) {
      case "0.5T":

        this.setState({ ajoutInterval: ajoutInterval + event.target.value })
        break;

      case "1T":

        this.setState({ ajoutInterval: ajoutInterval + event.target.value })
        break;

      case "1.5T":

        this.setState({ ajoutInterval: ajoutInterval + event.target.value })
        break;

      case "X":
        let arrayAjoutMode = this.state.ajoutInterval.split(" ");
        arrayAjoutMode.splice(arrayAjoutMode.length - 1, 1);
        this.setState({ ajoutInterval: arrayAjoutMode.join(" ") })
        break;

      default:
        break;
    }

  }






  render() {

    const { localStorageArray, selectedModeToDelete,
      deleteMode, selectedModeToEdit,
      closeModalEditMode, editMode, handleChangeEditMode, isCloseModalDeleteMode, selectEditModeBtn } = this.props;

    const { ajoutInterval, ajoutMode, errorAjoutMode } = this.state;
    if (errorAjoutMode) {
      if (ajoutInterval.length > 0 || ajoutMode.length > 0) {
        $('.alert-ajout-mode').hide();
        this.setState({ errorAjoutMode: false });
      }
    }

    let selectOptionsModeList = [];

    if (localStorageArray !== null) {
      for (let property in localStorageArray) {
        let name = Object.keys(localStorageArray[property]).join('');
        let interval = Object.values(localStorageArray[property]).join('');
        selectOptionsModeList.push(<option key={name} value={interval}>{name}</option>)
      }
    }


    return (
      <div className="container text-center mb-5">
        <div id="display-mode" className="text-center p-5 h2 display-mode-class"></div>
        <canvas id="canvas"></canvas>
        {/*   <!-- Bouton Lancer et Effacer --> */}
        <div className="text-center container mt-3 pb-5">
          {
            (this.props.inputTonique !== "defalut" && this.props.inputMode !== "default" && this.props.inputAccordage !== "")
              ?
              <button type="button" className="btn btn-primary" id="button-lancer" onClick={this.lancer}>Lancer</button>
              :
              <button type="button" className="btn btn-secondary" id="button-lancer">Lancer</button>
          }
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
                    className="form-control" onChange={this.handleOnChangeAddMode} />
                  <div className="mt-3"><label>intervalle des notes</label></div>

                  <div className="btn-group mb-2" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-outline-primary" value="0.5T" onClick={this.selectAddModeBtn}>0.5T</button>
                    <button type="button" className="btn btn-outline-primary" value="1T" onClick={this.selectAddModeBtn}>1T</button>
                    <button type="button" className="btn btn-outline-primary" value="1.5T" onClick={this.selectAddModeBtn}>1.5T</button>
                    <button type="button" className="btn btn-outline-danger" value="X" onClick={this.selectAddModeBtn}>X</button>
                  </div>

                  <input name="input-interval-mode-added" id="input-interval-mode-added" value={this.state.ajoutInterval} type='text' required='required'
                    className="form-control" onChange={this.handleOnChangeAddMode} />
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
                  <button className="btn btn-secondary">Appliquer</button>}
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

              {((localStorageArray === null) || (localStorageArray.length === 0)) && <div className="alert alert-warning alert-dismissible fade show container alert-error-suppression-mode" role="alert">
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
                      <input name="nom-modification-mode" id="nom-modification-mode" value={this.props.editNameMode} type='text' required='required' className="form-control" onChange={handleChangeEditMode} />
                      <div><label className="h5 pt-2">interval du mode</label></div>
                      <div className="btn-group mb-2" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-outline-primary" id="0.5T" onClick={selectEditModeBtn}>0.5T</button>
                        <button type="button" className="btn btn-outline-primary" id="1T" onClick={selectEditModeBtn}>1T</button>
                        <button type="button" className="btn btn-outline-primary" id="1.5T" onClick={selectEditModeBtn}>1.5T</button>
                        <button type="button" className="btn btn-outline-danger" id="X" onClick={selectEditModeBtn}>X</button>
                      </div>
                      <input name="interval-modification-mode" id="interval-modification-mode" value={this.props.editIntervalMode} type='text' required='required' className="form-control" onChange={handleChangeEditMode} />
                    </div>

                    {this.props.editNameMode.length > 0 || this.props.editIntervalMode ? <button type="button" className="btn btn-primary" id="modifier-mode" onClick={editMode}>Modifier</button>
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