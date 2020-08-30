
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
            editTextCard: "",
            isTooHeavy: false,
            message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
            isActive: true,

            nameImage: "",
            urlImage: "",
            altImage: "",
            image_id: 0

        }
    }

    handlerChangeInput = (event) => {

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
        fetch(REACT_APP_SERVER_ADDRESS_FULL + "/api/homepage_card", {
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


        let obj_data_image = {
            "name": this.state.nameImage,
            "url": this.state.urlImage,
            "alt": this.state.altImage,

        }


        function optionsPost(obj) {

            var requestOptions = {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('tAoDkMeInN')
                }),
                body: JSON.stringify(obj),
                redirect: 'follow'
            };

            return requestOptions;
        }


        const data = new FormData()
        data.append('file', this.state.document)

        const optionsImage = {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            redirect: "follow",
            referrer: "no-referrer",
            body: data
        }

        let obj_data = {
            "title": this.state.titleTextCard,
            "subtitle": "",
            "description": this.state.textCard,
            "section": event.target.id,
            "isActived": this.state.checkboxActivationApp
        }


        fetch(REACT_APP_SERVER_ADDRESS_FULL + '/api/image', optionsPost(obj_data_image))
            .then(response => response.json())
            .then(response => {
                obj_data.image_id = response[0].id;
                fetch(REACT_APP_SERVER_ADDRESS_FULL + '/api/homepage_card', optionsPost(obj_data))
                    .then(response => response.json())
                    .then(response => this.getData())
                    .catch(err => console.log({ 'ERROR': err.message }))
            })
            .catch(err => console.log({ 'ERROR': err.message }));


        this.setState({ titleTextCard: "", textCard: "" });


        fetch(REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadFile', optionsImage)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }


    editTextCard = () => {
        const { arrayId, dataCard, editTextCard, editTitleTextCard } = this.state;


        let obj_data = {
            "title": editTitleTextCard,
            "subtitle": "",
            "description": editTextCard,
            "section": "homepage-card-section",
            "image_id": dataCard[arrayId].image_id,
            "isActived": this.state.checkboxActivationApp ? 1 : 0
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

        fetch(REACT_APP_SERVER_ADDRESS_FULL + '/api/homepage_card/' + this.state.dataCard[arrayId].id, requestOptions)
            .then(response => response.json())
            .then(response => { this.getData() })
            .catch(err => console.log({ 'ERROR': err.message }))


    }

    getIdToEditText = (index, event) => {

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

        fetch(REACT_APP_SERVER_ADDRESS_FULL + '/api/image/' + this.state.dataCard[this.state.arrayId].image_id, requestOptions)
            .then(response => response.json())
            .then(response => { this.getData() })
            .catch(err => console.log({ 'ERROR': err.message }))
    }

    handlerUploadFile = event => {
        const format_type = [
            "application/pdf",
            "application/doc",
            "application/docx",
            "application/xls",
            "application/csv",
            "application/txt",
            "application/rtf",
            "application/html",
            "application/zip",
            "audio/mp3",
            "video/wma",
            "video/mpg",
            "video/flv",
            "video/avi",
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/gif"
        ];


        let file = event.target.files[0] ? event.target.files[0] : "";

        if (format_type.includes(event.target.files[0].type) && event.target.files[0].size <= 2000000) {
            this.setState({
                document: file,
                urlImage: "/images/" + file.name,
                nameImage: file.name,
                altImage: "image " + file.name
            });
        } else {
            this.setState({ isTooHeavy: true });
            event.target.value = "";
            this.setState({ isActive: true });
        }
    };

    handleCloseModal = () => {
        this.setState({ isActive: false, isTooHeavy: false });
    };

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

                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" onChange={this.handlerUploadFile} />
                                        <label className="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01">Upload une image</label>
                                    </div>
                                </form>
                                {this.state.isTooHeavy && (
                                    <div className={`${this.state.isActive ? "div-active-error" : "div-desactive-error"}`}>
                                        <span className="text-alert-error">
                                            {this.state.message_too_heavy}
                                        </span> {" "}<button type="button" className="btn btn-danger btn-sm" onClick={this.handleCloseModal}>ok</button>
                                    </div>
                                )}
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
