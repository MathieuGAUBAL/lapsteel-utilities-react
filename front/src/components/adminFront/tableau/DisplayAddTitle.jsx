import React, { Component } from 'react';

class DisplayAddTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const { title } = this.props;
      
        return (
            <div className="div-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">titre</th>
                            <th scope="col">modifier</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                        {title &&
                            <tr>
                                <th scope="row">1</th>
                                <td>{title}</td>
                                <td>
                                    {
                                        <button className="btn btn-warning btn-sm" type="button" data-toggle="modal" data-target="#modalEditTitleNewsAdmin">modifier</button>
                                    }
                                </td>

                            </tr>}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DisplayAddTitle;

