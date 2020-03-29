import React, { Component } from "react";
import EblockToken  from "./contracts/EblockToken.json";
import EblockTokenSale from "./contracts/EblockTokenSale.json"
import getWeb3 from "./getWeb3";
import "./App.css";
import Particles from 'react-particles-js'; 
import AboutICO from './components/AboutICO';
import BuyToken from "./components/BuyToken";
import  Info from  "./components/Info";
import Footer from "./components/footer"
import logo from "./logoebk.jpg"


const particleOpt={ 
    particles: { 
      number: { 
        value:100, 
        density: { 
          enable: true, 
          value_area:600, 
        }
      }, 
    }, 
  }

class App extends Component {
  state = {
    web3: null,
    accounts: null, 
    tokenContract: null,
    tokenSaleContract:null,
    totalSupply:0,
    tokenPrice:0,
    tokenName:'',
    tokenSymbol:'',
    tokenForSale:0,
    participants:0,
    tokenSold:0,
    percentageForBar:0,
    error:false,
    success:false
  
  
   };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log("console",web3)

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log(networkId)
      const deployedNetwork1 = EblockToken.networks[networkId];
      console.log(deployedNetwork1)
    
      const deployedNetwork2=EblockTokenSale.networks[networkId];
      const tokenContract = new web3.eth.Contract(
        EblockToken.abi,
        deployedNetwork1.address
      );
      const tokenSaleContract = new web3.eth.Contract(
        EblockTokenSale.abi,
        deployedNetwork2.address
      );

      // Set web3, accounts, and contract to the state
      this.setState({ web3, accounts, tokenContract,tokenSaleContract});
      this.loadBlockchainData();
      

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    
  };
  
  loadBlockchainData=async ()=>{
      var {tokenContract ,tokenSaleContract,accounts}=this.state;
      var totalSupply= await tokenContract.methods.totalSupply().call();
      console.log(totalSupply);
      var tokenName=await tokenContract.methods.name().call();
      console.log(tokenName);
      var tokenSymbol=await tokenContract.methods.symbol().call();
      console.log(tokenSymbol);
    
      var participants=await tokenContract.methods.getParticipants().call();
      console.log("participants are",participants);
      var tokenPrice=await tokenSaleContract.methods.tokenPrice().call();
      console.log("token price",tokenPrice);
      var tokenSold=await tokenSaleContract.methods.tokenSold().call();
      console.log("token sold",tokenSold);
      console.log("token address is",tokenSaleContract.options.address);
      var balance=await tokenContract.methods.balanceOf(tokenSaleContract.options.address).call();
      console.log("balance of instance",balance);
      var tokenForSale=(parseInt(tokenSold)+parseInt(balance))
      var percentageForBar=((parseInt(tokenSold)/tokenForSale)*100)
      console.log("percentageForBar",percentageForBar)
      this.setState({ totalSupply, tokenName,tokenSymbol,participants,tokenForSale,tokenSold,tokenPrice,percentageForBar});
      
  }
  
  buyToken=async (noOfTokens)=>{
    console.log("in app")
    console.log(noOfTokens)
    var {tokenSaleContract,tokenPrice,accounts}=this.state;
    try{
    var result=await tokenSaleContract.methods.buyTokens(noOfTokens).send({from:accounts[0],value:(noOfTokens*tokenPrice)});
    console.log("result is",result)
    this.setState({success:true})
      setTimeout(()=>{
        window.location.reload();
      },3000)
    }catch(error){
      this.setState({error:true})
      console.log("error is",error)
      setTimeout(()=>{
        window.location.reload();
      },3000)
    }


  }

  render() {
   var data= {totalSupply:this.state.totalSupply,tokenForSale:this.state.tokenForSale,tokenPrice:this.state.tokenPrice,participants:this.state.participants,tokenSold:this.state.tokenSold,web3:this.state.web3}
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
  <div className="App">
    <section id="title">
        <div className="demo">
              <nav class="navbar navbar-expand-lg navbar-dark">
              <a class="navbar-brand" href="#"><img class="logoimage"src={logo}/>EBK Token</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse " id="navbarText">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="#">Home</a>
                  </li>
                  <li class="nav-item active">
                    <a class="nav-link" href="#about">What is ICO</a>
                  </li>
                  <li class="nav-item active">
                    <a class="nav-link" href="#info">About </a>
                  </li>
                  <li class="nav-item active">
                    <a class="nav-link" href="#buy">Buy Token</a>
                  </li>
                  
                </ul>
              
              </div>
            </nav>     
              <div className="content">
                  <div  className="large-header">
                  <Particles  width={"100%"} height={"100%"}
                          params={particleOpt} 
                  /> 
                        <div className="heading">
                          <h1 className="main-title"><span className="thin">EBK ERC20</span> Token</h1>
                            <h2 className="secondTitle">Invest In The Future Of Currecy</h2>
                            <h2 className="secondTitle"> The most powerful social ICO platform </h2>
                            <a class="btn btn-4" href="#buy">Buy Token</a> 
                      </div>

                  </div>
              </div>
            </div>
      </section>
      <section id="about">
        <AboutICO />
        </section> 
        <section id="info">
        <Info data={data}/>
        </section> 
        <section id="buy">
        <BuyToken  buyToken={this.buyToken} percentage={this.state.percentageForBar} success={this.state.success} error={this.state.error} tokenSold={this.state.tokenSold} tokenSold={this.state.tokenSold} tokenForSale={this.state.tokenForSale}/>
        </section> 
        <section id="footer">
        <Footer/>         
       </section>
    </div>
    );
  }
}

export default App;
