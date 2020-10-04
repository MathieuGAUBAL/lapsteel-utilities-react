import React, { Component } from 'react';

class VersionWebSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            version: "",
            currentIdToEditVersion: null,
            arrayId: null,
            editVersion: "",

        }
    }

    handlerChangeInput = (event) => {
        switch (event.target.id) {
            case "version":
                this.setState({ version: event.target.value });
                break;

            case "editVersion":
                this.setState({ editVersion: event.target.value });
                break;
            default:
                break;
        }
    }

    getData = () => {
        fetch(process.env.REACT_APP_FOOTER, {
            method: "GET",
            json: true,
        })
            .then(response => response.json())
            .then(response => this.setState({ data: response, version: "" }))
            .catch(error => console.log(error));
    }

    componentDidMount = () => {
        this.getData();
    }

    sendVersion = (event) => {


        let obj_data = {
            "title": "version du site",
            "subtitle": "",
            "description": this.state.version,
            "section": "version-website",
            "image_id": null,
            "isActived": 1
        }


        var requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('tAoDkMeInN')
            }),
            body: JSON.stringify(obj_data),
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_FOOTER, requestOptions)
            .then(response => response.json())
            .then(response => this.getData())
            .catch(err => console.log({ 'ERROR': err.message }))
    }

    editVersion = () => {
        let obj_data = {
            "title": "version du site",
            "version": this.state.editVersion
        }


        var requestOptions = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('tAoDkMeInN')
            }),
            body: JSON.stringify(obj_data),
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_FOOTER + '/' + this.state.data[0].id, requestOptions)
            .then(response => response.json())
            .then(response => { this.getData() })
            .catch(err => console.log({ 'ERROR': err.message }))
    }


    deleteNews = () => {

        var requestOptions = {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('tAoDkMeInN')
            })
        };

        fetch(process.env.REACT_APP_FOOTER + '/' + this.state.currentIdToEditTextNews, requestOptions)
            .then(response => response.json())
            .then(response => { this.getData() })
            .catch(err => console.log({ 'ERROR': err.message }))
    }


    render() {
        return (
            <div className="container div-version-website">
                <div id="div-title">

                    {!this.state.data.length > 0 && <button type="button" className="btn btn-primary mb-3" data-toggle="modal" data-target="#modalAddVersion">
                        Ajouter un n° de version
                    </button>}

                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">titre</th>
                            <th scope="col">n° version</th>
                            <th scope="col">modifier</th>

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.data.length > 0 &&
                            <tr>
                                <th scope="row">1</th>
                                <td>{this.state.data[0].title}</td>
                                <td>{this.state.data[0].version}</td>
                                <td>
                                    {
                                        <button className="btn btn-warning btn-sm" type="button" data-toggle="modal" data-target="#modalEditVersion">modifier</button>
                                    }
                                </td>

                            </tr>}
                    </tbody>
                </table>

                {/*add version modal*/}
                <div className="modal fade" id="modalAddVersion" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="version">Ajouter un N° de version du site</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form className="d-flex justify-content-center">
                                    <div className="form-group mr-2">
                                        <input id="version" placeholder="N° de version" className="form-control" value={this.state.version} onChange={this.handlerChangeInput} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    id="title-news-section"
                                    onClick={this.sendVersion.bind(this)}
                                >Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*modify version modal*/}
                <div className="modal fade" id="modalEditVersion" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modifier un n° de version</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form className="d-flex flex-column">
                                    <div className="div-editVersion mb-3">
                                        <input
                                            type="texte"
                                            className="form-control"
                                            placeholder="N° de version"
                                            value={this.state.editVersion}
                                            id="editVersion"
                                            onChange={this.handlerChangeInput}
                                        />

                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    id="description-news-section"
                                    onClick={this.editVersion}>Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VersionWebSite;