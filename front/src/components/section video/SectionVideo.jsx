import React, { Component } from 'react';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';
import { Redirect } from 'react-router-dom';
import Footer from '../footer/Footer';
import getRessources from '../../utils/getRessources';
//import DisplayVideo from './DisplayVideo';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class SectionVideo extends Component{
    constructor(){
        super();
        this.state = {
            video_select:[],
            menu_selected:"all",
            dataVideo:[]
        }
    }

    get_section_name = (sectionArray) => {
        const list = sectionArray.filter((element, index) => sectionArray.lastIndexOf(element) === index);
        this.setState({video_select:list})
    }

    options = () => {
        const options = {
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('tSoEkCeRnT')
            }),
        }
        return options;
    }


    componentDidMount = async () => {
        // obtenir les ressources pour la section video
        let videosArray = await getRessources('videos',0 , 0, REACT_APP_SERVER_ADDRESS_FULL);
        //console.log(videosArray);
        let section_name = [];
        for(let i = 0; i < videosArray.length; i++){
            section_name.push(videosArray[i].section);
            if(i === videosArray.length - 1){
                this.get_section_name(section_name);
            }
        }
        this.setState({dataVideo:videosArray});
    }

    handleClickMenuSelected = (event) => {
        this.setState({menu_selected:event.target.id});
    }

    display = () => {
        if(this.state.menu_selected === 'all'){
            return (
                <div className="video-mapped">
                    {this.state.dataVideo.map((element, index) => ( 
                        <iframe key={index} className="embed-responsive-item mb-2 p-2" title={index}  src={element.url}  frameBorder="0"  allowFullScreen></iframe>
                    ))}
                </div>
            )
        }else {
            const result = this.state.dataVideo.filter((element, index) => element.section === this.state.menu_selected ? element : "");
            return (
                <div className="video-mapped mb-5">
                    {result.map((element, index) => ( 
                        <iframe key={index} className="embed-responsive-item mb-2 p-2" title={index}  src={element.url} frameBorder="0" allowFullScreen></iframe>
                    ))}
                </div>
            )
        }

    }



    render(){
        console.log("MENU : ",this.state.dataVideo);
        //console.log("RENDER ARRAY : " ,menuArray);
        
        return(
            <div className="sticky-wrap">
                 {localStorage.getItem('tSoEkCeRnT') ?  "" :  !this.props.isLoggued && <Redirect to="/Login" />}
                 <NavBarHomePage/>
                <h2>SECTION VIDEO</h2>
                <div className="container menu-deroulant-video">
                    <select className="form-control form-control-sm custom-select-video" >
                        <option id="all" onClick={this.handleClickMenuSelected} value='default'>all</option>
                        {this.state.video_select.map((element, index) =>  (<option key={index} id={element} value={index + 1} onClick={this.handleClickMenuSelected}>{element}</option>))}  
                    </select>
                </div>


                <h2 className="p-5">{this.state.menu_selected} videos</h2>
                
                 <div className="video-map">
                    {this.state.dataVideo.length > 0 && this.display()}
                </div>
 
                <div className="sticky-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default SectionVideo;