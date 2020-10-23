import React, { Component } from 'react';
const octave = require('octavian');

var context = new AudioContext();
var source = context.createBufferSource();

class InputAccordage extends Component {
    constructor() {
        super();
        this.state = {
            octave: [],
            array_letters: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
            tuning: [],
            tuning_frequency: [],
            isRunning: false,
            URL: {

                "A1": 'piano/Piano.ff.A1.mp3',
                "A2": 'piano/Piano.ff.A2.mp3',
                "A3": 'piano/Piano.ff.A3.mp3',
                "A4": 'piano/Piano.ff.A4.mp3',
                "A5": 'piano/Piano.ff.A5.mp3',
                "A6": 'piano/Piano.ff.A6.mp3',
                "A7": 'piano/Piano.ff.A7.mp3',

                "A#1": 'piano/Piano.ff.Ab1.mp3',
                "A#2": 'piano/Piano.ff.Ab2.mp3',
                "A#3": 'piano/Piano.ff.Ab3.mp3',
                "A#4": 'piano/Piano.ff.Ab4.mp3',
                "A#5": 'piano/Piano.ff.Ab5.mp3',
                "A#6": 'piano/Piano.ff.Ab6.mp3',
                "A#7": 'piano/Piano.ff.Ab7.mp3',

                "B1": 'piano/Piano.ff.B1.mp3',
                "B2": 'piano/Piano.ff.B2.mp3',
                "B3": 'piano/Piano.ff.B3.mp3',
                "B4": 'piano/Piano.ff.B4.mp3',
                "B5": 'piano/Piano.ff.B5.mp3',
                "B6": 'piano/Piano.ff.B6.mp3',
                "B7": 'piano/Piano.ff.B7.mp3',

                "C1": 'piano/Piano.ff.C1.mp3',
                "C2": 'piano/Piano.ff.C2.mp3',
                "C3": 'piano/Piano.ff.C3.mp3',
                "C4": 'piano/Piano.ff.C4.mp3',
                "C5": 'piano/Piano.ff.C5.mp3',
                "C6": 'piano/Piano.ff.C6.mp3',
                "C7": 'piano/Piano.ff.C7.mp3',

                "C#1": 'piano/Piano.ff.Db1.mp3',
                "C#2": 'piano/Piano.ff.Db2.mp3',
                "C#3": 'piano/Piano.ff.Db3.mp3',
                "C#4": 'piano/Piano.ff.Db4.mp3',
                "C#5": 'piano/Piano.ff.Db5.mp3',
                "C#6": 'piano/Piano.ff.Db6.mp3',
                "C#7": 'piano/Piano.ff.Db7.mp3',

                "D1": 'piano/Piano.ff.D1.mp3',
                "D2": 'piano/Piano.ff.D2.mp3',
                "D3": 'piano/Piano.ff.D3.mp3',
                "D4": 'piano/Piano.ff.D4.mp3',
                "D5": 'piano/Piano.ff.D5.mp3',
                "D6": 'piano/Piano.ff.D6.mp3',
                "D7": 'piano/Piano.ff.D7.mp3',

                "D#1": 'piano/Piano.ff.Eb1.mp3',
                "D#2": 'piano/Piano.ff.Eb2.mp3',
                "D#3": 'piano/Piano.ff.Eb3.mp3',
                "D#4": 'piano/Piano.ff.Eb4.mp3',
                "D#5": 'piano/Piano.ff.Eb5.mp3',
                "D#6": 'piano/Piano.ff.Eb6.mp3',
                "D#7": 'piano/Piano.ff.Eb7.mp3',

                "E1": 'piano/Piano.ff.E1.mp3',
                "E2": 'piano/Piano.ff.E2.mp3',
                "E3": 'piano/Piano.ff.E3.mp3',
                "E4": 'piano/Piano.ff.E4.mp3',
                "E5": 'piano/Piano.ff.E5.mp3',
                "E6": 'piano/Piano.ff.E6.mp3',
                "E7": 'piano/Piano.ff.E7.mp3',

                "F1": 'piano/Piano.ff.F1.mp3',
                "F2": 'piano/Piano.ff.F2.mp3',
                "F3": 'piano/Piano.ff.F3.mp3',
                "F4": 'piano/Piano.ff.F4.mp3',
                "F5": 'piano/Piano.ff.F5.mp3',
                "F6": 'piano/Piano.ff.F6.mp3',
                "F7": 'piano/Piano.ff.F7.mp3',

                "F#1": 'piano/Piano.ff.Gb1.mp3',
                "F#2": 'piano/Piano.ff.Gb2.mp3',
                "F#3": 'piano/Piano.ff.Gb3.mp3',
                "F#4": 'piano/Piano.ff.Gb4.mp3',
                "F#5": 'piano/Piano.ff.Gb5.mp3',
                "F#6": 'piano/Piano.ff.Gb6.mp3',
                "F#7": 'piano/Piano.ff.Gb7.mp3',

                "G1": 'piano/Piano.ff.G1.mp3',
                "G2": 'piano/Piano.ff.G2.mp3',
                "G3": 'piano/Piano.ff.G3.mp3',
                "G4": 'piano/Piano.ff.G4.mp3',
                "G5": 'piano/Piano.ff.G5.mp3',
                "G6": 'piano/Piano.ff.G6.mp3',
                "G7": 'piano/Piano.ff.G7.mp3',

                "G#1": 'piano/Piano.ff.Ab1.mp3',
                "G#2": 'piano/Piano.ff.Ab2.mp3',
                "G#3": 'piano/Piano.ff.Ab3.mp3',
                "G#4": 'piano/Piano.ff.Ab4.mp3',
                "G#5": 'piano/Piano.ff.Ab5.mp3',
                "G#6": 'piano/Piano.ff.Ab6.mp3',
                "G#7": 'piano/Piano.ff.Ab7.mp3'
            },
            currentAudio: []
        }
    }


    componentDidMount = () => {
        this.fillArray();
    }

    fillArray = () => {
      
        let count = 1;
        let array = [];
        let arrayFinal = [];
       

        for (let letter of this.state.array_letters) {
            for (let i = 1; i <= 7; i++) {
                const dropList = <p key={letter + i} id={letter + i} onClick={this.handleClick}>{letter + i}</p>;
                array.push(dropList);
            
                if (count === 7) {
                    count = 1;
                    arrayFinal.push(array);
                    array = [];
                    break;
                }
                count++;
            }
        }
        this.setState({ octave: arrayFinal });
    }

    handleClick = (event) => {
        const { selectTuningModeNote } = this.props;
        const note_raw = event.target.id;
        const note = new octave.Note(`${note_raw}`);

      
        selectTuningModeNote(note_raw);

        this.setState({
            tuning: [...this.state.tuning, note_raw],
            tuning_frequency: [...this.state.tuning_frequency, note.frequency]
        })
        this.buffer(note_raw);
    }

    buffer = (note) => {

        for (let i in this.state.URL) {
            if (i === note) {
                fetch(this.state.URL[i])
                    .then(response => response.arrayBuffer())
                    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
                    .then(audioBuffer => {
                        this.setState({
                            currentAudio: [...this.state.currentAudio, audioBuffer]
                        })
                    });
                break;
            }
        }
    }

    handleClickSound = (event) => {
        const index = event.target.id;
        if (this.state.currentAudio.length > 0) {
            source = context.createBufferSource();
            source.buffer = this.state.currentAudio[index];
            source.connect(context.destination);
            source.start();
        }
    }

    /*     handleSoundOut = (event) => {
                source.disconnect(context.destination);
            } */

    deleteLastNote = () => {
        const { deleteTuningModeNote } = this.props;
        const array_frequency = this.state.tuning_frequency;
        const array_notes = this.state.tuning;
        const currentAudio = this.state.currentAudio;

        array_frequency.splice(array_frequency.length - 1, 1);
        array_notes.splice(array_notes.length - 1, 1);
        currentAudio.splice(currentAudio.length - 1, 1);
        
        deleteTuningModeNote(this.state.tuning);

        this.setState({
            tuning_frequency: array_frequency,
            tuning: array_notes,
            currentAudio: currentAudio
        })
    }



    render() {


        return (
            <div>
                <div className="container btn-group d-flex justify-content-around flex-wrap pt-5">
                    {
                        this.state.array_letters.length > 0 &&
                        this.state.array_letters.map((btn, index) => (
                            <div key={btn + '_' + index} className="btn-group">
                                <div className="dropdown">
                                    <button className="btn btn-outline-primary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {btn}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {this.state.octave[index]}
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>

                <div className="pt-5" id="notes">
                    {this.state.tuning_frequency.map((frequency, index) => (
                        <button className="btn btn-outline-dark btn-sm" key={index}
                            onMouseOver={this.handleClickSound} id={index}
                            onMouseOut={this.handleSoundOut} >{this.state.tuning[index]}</button>
                    ))}
                </div>

                <div className="pt-5 pb-5">
                    <button className="btn btn-outline-danger" onClick={this.deleteLastNote}>X</button>
                </div>


            </div>

        )
    }
}

export default InputAccordage;