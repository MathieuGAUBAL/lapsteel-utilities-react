import React, { Component } from 'react';

class InputTonique extends Component{
    constructor(props){
        super(props);
    }


    render(){
        const { handleOnChangeInput } = this.props;
        return(
            <div>
                <div className="div-tonique text-center container input-group">
                    <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="input-tonique-tonique">Tonique</label>
                    </div>
                    <select id="input-tonique-tonique" name="nom" size="1" className="form-control" onChange={handleOnChangeInput}>
                        <option>C</option>
                        <option>C#</option>
                        <option>D</option>
                        <option>D#</option>
                        <option>E</option>
                        <option>F</option>
                        <option>F#</option>
                        <option>G</option>
                        <option>G#</option>
                        <option>A</option>
                        <option>A#</option>
                        <option>B</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default InputTonique;