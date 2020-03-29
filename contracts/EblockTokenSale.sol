pragma solidity >=0.4.22 <0.7.0;
import "./EblockToken.sol";

contract EblockTokenSale {
    address payable admin;
    EblockToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokenSold;
    address[] public participants;

    event Sell(address _buyer,uint256 _amount);

constructor(EblockToken _tokenContract,uint256 _tokenPrice) public{
     admin=msg.sender;
     tokenContract=_tokenContract;
     tokenPrice=_tokenPrice; 


}

//buy token 
function buyTokens(uint256 _numberOfTokens) public payable{
  
  require(msg.value == (_numberOfTokens*tokenPrice));

  require(tokenContract.balanceOf(address(this)) >=_numberOfTokens);
  require(tokenContract.transfer(msg.sender,_numberOfTokens));
  tokenSold += _numberOfTokens;
  
  emit Sell(msg.sender,_numberOfTokens);

}
//Ending the token sale 

function endSale() public {
  //require admin can do this
  require(msg.sender == admin);
  //Transfer remaining token to admin
  require(tokenContract.transfer(admin,tokenContract.balanceOf(address(this)))); 
  //Destroy contract
  selfdestruct(admin);
}


function getParticipants() public  view returns (uint256 total){
  return participants.length;
}

}