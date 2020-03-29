import React, { Component } from "react";

import {  ProgressBar,Alert} from 'react-bootstrap';

import "./BuyToken.css"




class BuyToken extends Component{
    constructor(props){
     super(props)
     this.state={
         NoOfTokens:0,
         
     }
   }
   
    tokenInputHandler=(event)=>{

        const name=event.target.value;
        this.setState({NoOfTokens:name})
    }


    buyToken=()=>{
        console.log("in buy token")
       
        this.props.buyToken(this.state.NoOfTokens)
    }




    render(){
        var percentage=this.props.percentage;
        var error=this.props.error;
        var success=this.props.success;
        var tokenSold=this.props.tokenSold;
        var tokenForSale=this.props.tokenForSale;
        console.log(tokenSold);
        console.log(tokenForSale);
       
        return (
        <div class="buyToken">
         <h1 style={{fontFamily:"'Lobster', cursive",color:"blue" ,textAlign:"center",padding:"50px"}}>Buy Token</h1>
                <div class="card" style={{backgroundColor:"white",width:"900px",height:"400px",textAlign:"center",margin:"0 auto",borderRadius:"10px"}}>
                    <div class="card-body">
                      <p style={{textAlign:"center",fontSize:"25px",color:"blue"}}>{tokenSold}/{tokenForSale}</p>
                      <ProgressBar now={percentage} label={`${percentage}%`} variant="success" style={{height:"45px",borderRadius:"30px"}} />;
                      {error?<div>
                    <Alert variant="danger">
                       Something Went Wrong!!!Try again with correct values
                      </Alert>
                      </div>:null}
                      {success?<div>
                    <Alert variant="success">
                        ThankYou for buying Token!!!!
                      </Alert>
                      </div>:null}
                      <form onSubmit={this.buyToken}>
                            <div class="input-group mb-3">
                                {/* <div class="input-group-prepend">
                                <span style={{borderRadius:"20px 0 0 20px"}} class="input-group-text" id="basic-addon1">Ether</span>
                            </div>  */}
                            <input type="text" class="form-control" placeholder="Enter Numbers Of Tokens"  aria-describedby="basic-addon2" style={{height:"60px"}} value={this.state.NoOfTokens}  onChange={this.tokenInputHandler} />
                            <div class="input-group-append">
                                    <button type="submit" class="btn btn-primary"  id="basic-addon2" style={{margin:"0px" ,height:"60px" ,paddingTop:"10px",borderRadius:"0px 20px 20px 0px "}}><h4>BUY TOKEN</h4></button>
                            </div>
                           </div>


                    </form> 
                </div>
             </div> 
        </div>
        )
        
    }
}
export default BuyToken