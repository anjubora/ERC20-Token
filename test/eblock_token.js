const EblockToken = artifacts.require("EblockToken");
contract('EblockToken',function(accounts){
var tokenInstance;
it('Initialize the contract with the corrrect values',function(){

return EblockToken.deployed().then(function(instance){
  tokenInstance=instance;
  return tokenInstance.name();



}).then((name)=>{
  assert.equal(name,'EblockToken','has the correct name')
  return tokenInstance.symbol();
}).then((symbol)=>{
  assert.equal(symbol,'EBK','has the correct symbol')
  return tokenInstance.standard();
}).then((standard)=>{
  assert.equal(standard,'EblockToken v1.0')
})

})



it('sets the total supply upon deployment',()=>{
  return EblockToken.deployed().then((instance)=>{
    tokenInstance=instance;
    return tokenInstance.totalSupply();

  }).then((totalSupply)=>{
    assert.equal(totalSupply.toNumber(),1000000,'sets the total supply to 1000000');
    return tokenInstance.balanceOf(accounts[0]);

  }).then((balance)=>{
    assert.equal(balance,1000000,'balace is correct')

  })



});

it('transfers token ownership',function(){
   return EblockToken.deployed().then(instance=>{
     tokenInstance=instance;
     return tokenInstance.transfer.call(accounts[1],900000000000000);
   }).then(assert.fail).catch(function(error)
   {
  
     assert(error.message.indexOf('revert')>=0,'error message must contain revert');
     return tokenInstance.transfer.call(accounts[1],25000,{from:accounts[0]});
   }).then((success)=>{
     assert.equal(success,true,'The transfer function should return true')

    return tokenInstance.transfer(accounts[1],25000,{from:accounts[0]});
   }).then((receipt)=>{
     
     assert.equal(receipt.logs.length,1,'triggers one event');
     assert.equal(receipt.logs[0].event,'Transfer','Should be the "transfer" event');
     assert.equal(receipt.logs[0].args._from,accounts[0],'logs the account the token are transfer from');
     assert.equal(receipt.logs[0].args._to,accounts[1],'logs the account the token are transfered to');
     assert.equal(receipt.logs[0].args._value,25000,'logs the transfer amount');
    return tokenInstance.balanceOf(accounts[1]);


   }).then((balance)=>{
      assert.equal(balance.toNumber(),25000,'adds the amount to the receipent')
   })



})

it('approve token for delegated tranfer',function(){
return EblockToken.deployed().then(function(instance){
   tokenInstance=instance;
   return tokenInstance.approve.call(accounts[1],100);
}).then((success)=>{
    assert.equal(success,true,'it returns true');

  return tokenInstance.approve(accounts[1],100,{from:accounts[0]});
}).then(receipt=>{
  assert.equal(receipt.logs.length,1,'triggers one event');
  assert.equal(receipt.logs[0].event,'Approval','Event name should be approval');
return tokenInstance.allowance(accounts[0],accounts[1]);

}).then((allowance)=>{
 assert.equal(allowance,100,'it should be 100')
})
})

it('handles the delegated transfer',function(){
  return EblockToken.deployed().then(function(instance){
   tokenInstance=instance;
   fromAccount=accounts[2];
   toAccount=accounts[3];
   spendingAccount=accounts[4];
   return tokenInstance.transfer(fromAccount,100,{from:accounts[0]})
  }).then(function(receipt){
   return tokenInstance.approve(spendingAccount,10,{from:fromAccount}); 
  }).then(function(receipt){
    return tokenInstance.transferFrom(fromAccount,toAccount,9999,{from:spendingAccount});

  }).then(assert.fail).catch(function(err){
    assert(err.message.indexOf('revert')>=0,'cannot transfer value larger than balance');
    return tokenInstance.transferFrom(fromAccount,toAccount,20,{from:spendingAccount});
  }).then(assert.fail).catch(function(err){
    assert(err.message.indexOf('revert')>=0,'cannot transfer value larger than approved value');
    return tokenInstance.transferFrom.call(fromAccount,toAccount,10,{from:spendingAccount});
  }).then(function(success){
      assert.equal(success,true,'it should return true')
      return tokenInstance.transferFrom(fromAccount,toAccount,10,{from:spendingAccount});
  }).then(function(receipt){
    assert.equal(receipt.logs.length,1,'triggers one event');
    assert.equal(receipt.logs[0].event,'Transfer','Should be the "transfer" event');
    assert.equal(receipt.logs[0].args._from,fromAccount,'logs the account the token are transfer from');
    assert.equal(receipt.logs[0].args._to,toAccount,'logs the account the token are transfered to');
    assert.equal(receipt.logs[0].args._value,10,'logs the transfer amount');
    return tokenInstance.balanceOf(fromAccount);

  }).then(function(balance){
    assert.equal(balance.toNumber(),90,'deducts the amount from the sending account');
    return tokenInstance.balanceOf(toAccount);
  }).then(function(balance){
    assert.equal(balance.toNumber(),10,'adds the amount from the receiving account');
    return tokenInstance.allowance(fromAccount,spendingAccount);
  }).then(function(allowance){
    assert.equal(allowance,0,'deducts the amount from the allowance')
  });



})

   

})
