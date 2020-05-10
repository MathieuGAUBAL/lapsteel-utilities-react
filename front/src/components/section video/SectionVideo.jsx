import React, { Component } from 'react';
import NavBarHomePage from '../NavBarHompage/NavBarHomePage';
import Footer from '../footer/Footer';
import getRessources from '../../utils/getRessources';


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

    getVideos = async() => {
        // obtenir les ressources pour la section video
        let videosArray = await getRessources('videos',0 , 0, REACT_APP_SERVER_ADDRESS_FULL);
        let section_rubrique = [];
        for(let i = 0; i < videosArray.length; i++){
            section_rubrique.push(videosArray[i].rubrique);
            if(i === videosArray.length - 1){
                this.get_section_name(section_rubrique);
            }
        }
        this.setState({dataVideo:videosArray, menu_selected:"all"});
    }

    async getVideosSelected(rubrique){
        let url;
        if(rubrique === 'default'){
            url = REACT_APP_SERVER_ADDRESS_FULL + "/api/videos";
        }else{
            url = REACT_APP_SERVER_ADDRESS_FULL + "/api/videos/"+ rubrique;
        }
        

        const data = await (await (fetch(url))).json();
  
        this.setState({dataVideo:data, menu_selected:rubrique});

    }


    componentDidMount = () => {
        this.getVideos();
    }

    handleClickMenuSelected = (event) => {
  
        this.getVideosSelected(event.target.value);
    }


    render(){

        return(
            <div className="sticky-wrap">
               
                <NavBarHomePage/>
                <h2>SECTION VIDEO</h2>
                <div className="container menu-deroulant-video">
                    <select className="form-control form-control-sm custom-select-video" onChange={this.handleClickMenuSelected}>
                        <option id="all"  value='default'>all</option>
                        {this.state.video_select.map((element, index) => (
                        <option key={index} id={element} >{element}</option>
                        ))   }  
                    </select>
                </div>


                <h2 className="p-5">{this.state.menu_selected === "default" ? "all" : this.state.menu_selected } videos</h2>
                
                 <div className="container video-map">
                    {this.state.dataVideo.length > 0 && <div className="video-mapped mb-5">
                        {this.state.dataVideo.map((element, index) => ( 
                            <iframe key={index} className="embed-responsive-item mb-2 p-2" title={index}  src={element.url} frameBorder="0" allowFullScreen></iframe>
                        ))}
                    </div>}
                </div>
 
                <div className="sticky-footer">
                    <Footer />
                </div>
            </div>
        )
    }
}

export default SectionVideo;