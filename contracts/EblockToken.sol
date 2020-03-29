pragma solidity >=0.4.22 <0.7.0;


contract EblockToken {
  string public name="EblockToken";
  string public symbol="EBK"; 
  string  public standard='EblockToken v1.0';
  
  address[] public participants;
  uint256 public totalSupply;

  event Transfer(
      address indexed _from,
      address indexed _to,
      uint256  _value

  );
  event Approval(
     address indexed _owner,
     address indexed _spender,
     uint256   _value
  );

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance; 

  constructor(uint256 _initialSupply) public {
    balanceOf[msg.sender]= _initialSupply;
    totalSupply = _initialSupply;
  }
  //trasfer function
  function transfer(address _to,uint256 _value)public returns (bool success){
    require(balanceOf[msg.sender] >= _value);  
    if(balanceOf[_to]==0){
       participants.push(msg.sender);
     }
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    emit Transfer(msg.sender,_to,_value);
    return true; 

  }

  //delegated Transfer

  function approve(address _spender,uint256 _value) public returns (bool success){
   allowance[msg.sender][_spender]=_value;
   emit Approval(msg.sender,_spender,_value);
   return true;

  }

  //transferFrom 
  
function transferFrom(address _from,address _to,uint256 _value) public returns (bool success){
  //from balance is larger then transferred value
  require(_value <= balanceOf[_from]);
  //only equal to less then approved value can be trasferred
  require(_value <= allowance[_from][msg.sender]);
  //update the balances 
  balanceOf[_from]-=_value;
  balanceOf[_to]+= _value;
  //updating the allowance
  allowance[_from][msg.sender] -= _value;
  //emitting the transfer event 
  emit Transfer(_from,_to,_value);
  //return true as erc20 token standard
  return true;   



}

function getParticipants() public  view returns (uint256 total){
  return participants.length;
}
}