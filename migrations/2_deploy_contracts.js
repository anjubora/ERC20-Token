const EblockToken = artifacts.require("EblockToken");
const EblockTokenSale = artifacts.require("EblockTokenSale");

module.exports = function(deployer) {

  deployer.deploy(EblockToken,1000000).then(()=>{
    var tokenPrice='10000000000000'
     return deployer.deploy(EblockTokenSale,EblockToken.address,tokenPrice)
  })
 
};
