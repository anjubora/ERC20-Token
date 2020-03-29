import React, { Component } from "react";
import {faUniversity,faCoins,faDollarSign,faUsers,faEthereum,faPiggyBank} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class Info extends Component{
   

   


    render(){
      var {totalSupply,tokenForSale,tokenPrice,participants,tokenSold,web3}=this.props.data;
        return(
 <div className="info"> 
             <h1 style={{fontFamily:"'Lobster', cursive",color:"blue" ,textAlign:"center",paddingTop:"50px"}}>About EBK Token Sale</h1>
    <div class="container">
             <div class="row">
                <div class="column">
                    <div class="card"> 
                       <span class="icon"><FontAwesomeIcon icon={faUniversity} size='5x'/></span>
                       <h1 class="widgetInfo">Total Supply</h1>
        <h1 class="value">{totalSupply}</h1>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <span class="icon"> <FontAwesomeIcon icon={faCoins}  size='5x'/></span>
                        <h1 class="widgetInfo">Token for sale</h1>
        <h1 class="value">{tokenForSale}</h1>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <span class="icon"> <FontAwesomeIcon icon={faDollarSign}  size='5x'/></span>
                        <h1 class="widgetInfo">Current Price of token</h1>
                        <h1 class="value">{web3.utils.fromWei(tokenPrice.toString(),"ether")} ether</h1>
                    </div>
                </div>
            </div>
               
            <div class="row">
          
                <div class="column">
                    <div class="card">
                         <span class="icon"> <FontAwesomeIcon icon={faUsers}  size='5x'/></span>
                         <h1 class="widgetInfo">Holders of token</h1>
                           <h1 class="value">{participants}</h1>
                    </div>
                </div>
                <div class="column">
                    <div class="card">  
                        <span class="icon"> <FontAwesomeIcon icon={faPiggyBank}  size='5x'/></span>
                        <h1 class="widgetInfo">Sold Token</h1>
                           <h1 class="value">{tokenSold}/{tokenForSale}</h1>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <span class="icon"> <FontAwesomeIcon icon={faCoins}  size='5x'/></span>
                        <h1 class="widgetInfo">Acceptable Currency</h1>
                        <h1 class="value">ETH</h1>
                    </div>
                </div>
                   
            </div>
    </div>                                
</div>

             )
      
    }
}
export default Info