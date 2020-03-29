import React, { Component } from "react";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




class Footer extends Component{


    render(){
        return(
            <div style={{backgroundColor:"#17202A",height:"200px",widht:"100%",textAlign:"center",color:"white"}}>
               <h3 style={{padding:"60px"}}>  Made by <FontAwesomeIcon icon={faHeart}/>Anju Bora</h3>


            </div>
        )
      
    }
}

export default Footer