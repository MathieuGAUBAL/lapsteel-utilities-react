import React, { Component } from 'react';

class DisplayAddCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const { dataCard, getIdToEditText } = this.props;

        return (
            <div className="div-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">titre application</th>
                            <th scope="col">activer</th>
                            <th scope="col">modifier</th>
                            <th scope="col">supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCard.length && dataCard.map((element, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{element.title}</td>
                                <td>{element.isActived ? "oui" : "non"}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm" type="button" data-toggle="modal" data-target="#modalEditTextCardAdmin" onClick={getIdToEditText.bind(this, index)}>modifier</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm" type="button" data-toggle="modal" data-target="#modalDeleteTextCardAdmin" onClick={getIdToEditText.bind(this, index)}>supprimer</button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DisplayAddCard;

