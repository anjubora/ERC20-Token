import React, { Component } from "react";
import ico from "../ico.jpg"

class AboutICO extends Component{


    render(){
       return ( 
       <div >
           <h1 style={{fontFamily:"'Lobster', cursive",color:"blue" ,textAlign:"center",paddingTop:"50px"}}>WHAT IS ICO</h1>
           <div class="row">
                <div class="col-7"> 
                    <ul style={{fontFamily:"DM Serif Text', serif",lineHeight:"35px",fontSize:"20px"}}>
                        <li> Initial Coin Offerings (ICOs) are a popular fundraising method used primarily by startups wishing to offer products and services, usually related to the cryptocurrency and blockchain space.</li>
                        <li>ICOs are similar to stocks, but they sometimes have utility for a software service or product offered. </li>
                        <li>Some ICOs have yielded massive returns for investors. Numerous others have turned out to be fraud or have failed or performed poorly.</li> 
                        <li>To participate in an ICO, you will usually need to purchase a digital currency first and have a basic understanding of how to use cryptocurrency wallets and exchanges. </li>
                        <li>ICOs are, for the most part, completely unregulated, so investors must exercise a high degree of caution and diligence when researching and investing in ICOs.</li>
                    </ul>
                 </div>
                <div class="col-5">
                       <img src={ico}  height="80%" width="100%"/>
                </div>
            </div>
         </div>
           )    }
}
export default AboutICO