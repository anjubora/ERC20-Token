var EblockTokenSale=artifacts.require('EblockTokenSale');
var EblockToken=artifacts.require('EblockToken')
contract('EblockTokenSale',(accounts)=>{
var tokenSaleInstance;
var tokenInstance;
var tokenPrice='10000000000000'
it('initialize the contract with correct values',()=>{
return EblockTokenSale.deployed().then((instance)=>{
    tokenSaleInstance=instance;
     
        return tokenSaleInstance.address;
        }).then(function(address){
             assert.notEqual(address,0x0,'has contract address')
             return tokenSaleInstance.tokenContract();
        }).then((address)=>{
            assert.notEqual(address,0x0,'has contract address of token instance')
            return tokenSaleInstance.tokenPrice();
        }).then((price)=>{
            assert.equal(price,tokenPrice,'token price is correct')
        })
    });

it('ends token sale',()=>{
return EblockToken.deployed().then((instance)=>{
   tokenInstance=instance;
   return EblockTokenSale.deployed();
  }).then((instance)=>{
  tokenSaleInstance=instance;
 //try to end sale by the account other than admin
   return tokenSaleInstance.endSale({from:accounts[2]});       
}).then(assert.fail).catch((error)=>{
    assert(error.message.indexOf('revert')>=0,'must be admin to end sale');
    return tokenSaleInstance.endSale({from:accounts[0]});       
}).then((receipt)=>{
    return tokenInstance.balanceOf(accounts[0]);

}).then((balance)=>{
    assert.equal(balance.toNumber(),1000000,'return all unsold dapp token to admin')
  // return tokenSaleInstance.tokenPrice();
})
// .then((price)=>{
//     assert.equal(price.toNumber(),0,'token price was reset')
// })
      
 });
});

