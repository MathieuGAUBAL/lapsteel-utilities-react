
import React, { Component } from 'react';
import DisplayAddCard from '../tableau/DisplayAddCard';


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class ApplicationsCardAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCard: [],
            titleCard: "",
            getTitle: [],
            titleTextCard: "",
            textCard: "",
            currentIdToEditTextCard: null,
            arrayId: null,
            checkboxActivationApp: false,

            editTitleTextCard: "",
            editTextCard: ""

        }
    }

    handlerChangeInput = (event) => {
        console.log();
        switch (event.target.id) {
            case "titleTextCardInput":
                this.setState({ titleTextCard: event.target.value });
                break;

            case "CardInput":
                this.setState({ textCard: event.target.value });
                break;

            case "editCardInput":
                this.setState({ editTextCard: event.target.value });
                break;

            case "editTitleTextCardInput":
                this.setState({ editTitleTextCard: event.target.value });
                break;

            case "checkboxActivationApp":
                this.setState({ checkboxActivationApp: event.target.checked });
                break;

            default:
                break;
        }
    }

    getData = () => {
        fetch(REACT_APP_SERVER_ADDRESS_FULL + "/api/homepage/homepage-card?section=homepage-card-section", {
            method: "GET",
            json: true,
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ dataCard: response })
            })

            .catch(error => console.log(error))
    }



    componentDidMount = () => {
        this.getData();
    }

    sendCard = (event) => {

        let obj_data = {
            "title": this.state.titleTextCard,
            "subtitle": "",
            "description": this.state.textCard,
            "section": event.target.id,
            "image_id": 1,
            "isActived": this.state.checkboxActivationApp
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

        fetch('http://localhost:5000/api/homepage', requestOptions)
            .then(response => response.json())
            .then(response => this.getData())
            .catch(err => console.log({ 'ERROR': err.message }))

        this.setState({ titleTextCard: "", textCard:""});
    }


    editTextCard = () => {
        const { arrayId, editTextCard, editTitleTextCard } = this.state;


        let obj_data = {
            "title": editTitleTextCard ,
            "subtitle": "",
            "description": editTextCard,
            "section": "homepage-card-section",
            "image_id": 1,
            "isActived": this.state.checkboxActivationApp ? 1 : 0
        }

        console.log(obj_data);


        var requestOptions = {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('tAoDkMeInN')
            }),
            body: JSON.stringify(obj_data),
            redirect: 'follow'
        };

        fetch('http://localhost:5000/api/homepage/' + this.state.dataCard[arrayId].id, requestOptions)
            .then(response => response.json())
            .then(response => { this.getData() })
            .catch(err => console.log({ 'ERROR': err.message }))


    }

    getIdToEditText = (index, event) => {
        console.log(index);
        this.setState({
            currentIdToEditTextCard: this.state.dataCard[index].id,
            editTitleTextCard: this.state.dataCard[index].title,
            editTextCard: this.state.dataCard[index].description,
            arrayId: index,
            checkboxActivationApp: this.state.dataCard[index].isActived
        });
    }

    deleteCard = () => {

        var requestOptions = {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('tAoDkMeInN')
            })
        };

        fetch('http://localhost:5000/api/homepage/' + this.state.dataCard[this.state.arrayId].id, requestOptions)
            .then(response => response.json())
            .then(response => { this.getData() })
            .catch(err => console.log({ 'ERROR': err.message }))
    }



    render() {


        return (
            <div className="div-container">



                <div id="div-Card" className="p-5">
                    <button type="button" className="btn btn-primary mb-3" data-toggle="modal" data-target="#modalAddCardAdmin">
                        Ajouter une Card
                    </button>
                </div>

                <div className="tab">
                    {this.state.dataCard.length > 0 && <DisplayAddCard dataCard={this.state.dataCard} getIdToEditText={this.getIdToEditText} />}
                </div>


                {/*add Card modal*/}
                <div className="modal fade" id="modalAddCardAdmin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ajouter une Card</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form className="d-flex flex-column">
                                    <div className="div-titleTextCard mb-3">
                                        <input
                                            type="texte"
                                            className="form-control"
                                            placeholder="Titre de l'application"
                                            value={this.state.titleTextCard}
                                            id="titleTextCardInput"
                                            onChange={this.handlerChangeInput}
                                        />

                                    </div>
                                    <div className="form-group mr-2" style={{ width: "100%", height: "3rem" }}>
                                        <textarea
                                            id="CardInput"
                                            placeholder="description de l'application"
                                            className="form-control"
                                            value={this.state.textCard}
                                            onChange={this.handlerChangeInput}
                                        />
                                    </div>
                                    <div className="div-chackBoxActivationApplication mb-3 p-5">
                                        <label htmlFor="checkboxActivationApp">Activer l'application</label>
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            id="checkboxActivationApp"
                                            name="checkboxActivationApp"
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
                                    id="homepage-card-section"
                                    onClick={this.sendCard.bind(this)}>
                                    Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/*modify text Card modal*/}
                <div className="modal fade" id="modalEditTextCardAdmin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modifier une Card</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <form className="d-flex flex-column">
                                    <div className="div-titleTextCard mb-3">
                                        <input
                                            type="texte"
                                            className="form-control"
                                            placeholder="Titre de la description"
                                            value={this.state.editTitleTextCard}
                                            id="editTitleTextCardInput"
                                            onChange={this.handlerChangeInput}
                                        />

                                    </div>
                                    <div className="form-group mr-2" style={{ width: "100%", height: "3rem" }}>
                                        <textarea
                                            id="editCardInput"
                                            placeholder="description de la Card"
                                            className="form-control"
                                            value={this.state.editTextCard}
                                            onChange={this.handlerChangeInput}
                                        />
                                    </div>

                                    <div className="div-chackBoxActivationApplication mb-3 p-5">
                                        <label htmlFor="checkboxActivationApp">Activer l'application</label>
                                        <input
                                            type="checkbox"
                                            className="form-control"
                                            checked={this.state.checkboxActivationApp}
                                            id="checkboxActivationApp"
                                            name="checkboxActivationApp"
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
                                    id="description-Card-section"
                                    onClick={this.editTextCard}>Enregistrer</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/*delete text Card modal*/}
                <div className="modal fade" id="modalDeleteTextCardAdmin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">supprimer une Card</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Etes vous certain de vouloir supprimer cette Card ?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    id="description-card-section"
                                    onClick={this.deleteCard}>supprimer</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default ApplicationsCardAdmin;
