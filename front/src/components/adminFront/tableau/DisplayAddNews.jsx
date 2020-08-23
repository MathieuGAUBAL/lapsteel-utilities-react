import React, { Component } from 'react';

class DisplayAddNews extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const { dataNews, getIdToEditText } = this.props;

        return (
            <div className="div-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">titre News</th>
                            <th scope="col">date News</th>
                            <th scope="col">modifier</th>
                            <th scope="col">supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataNews.length && dataNews.map((element, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{element.subtitle}</td>
                                <td>{element.description.date}</td>
                                <td>
                                    {
                                        <button className="btn btn-warning btn-sm" type="button" data-toggle="modal" data-target="#modalEditTextNewsAdmin" onClick={getIdToEditText.bind(this, index)}>modifier</button>
                                    }
                                </td>
                                <td>
                                    {
                                        <button className="btn btn-danger btn-sm" type="button" data-toggle="modal" data-target="#modalDeleteTextNewsAdmin" onClick={getIdToEditText.bind(this, index)}>supprimer</button>
                                    }
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

export default DisplayAddNews;

