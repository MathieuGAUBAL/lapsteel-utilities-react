import React, { Component } from 'react';

class Canvas extends Component{
    render(){
        return(
            <div className="container text-center mb-5">
                <div id="display-mode" className="text-center p-5 h2 display-mode-class"></div>
                <canvas id="canvas"></canvas>
          </div>  
        )
    }
}

export default Canvas;