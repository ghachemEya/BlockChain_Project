pragma solidity ^0.5.0;
import "./DappToken.sol";
import "./DaiToken.sol";


contract TokenFarm {
    // All code goes here...

    string public name = "Dapp Token Farm";
    DappToken public daapToken;
    DaiToken public daiToken;
    address public owner;

    address[] public stakers;
    mapping(address => uint ) public stakingBalence;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;


    constructor(DappToken _dappToken, DaiToken _daiToken) public{
       daapToken = _dappToken;
       daiToken = _daiToken;
       owner = msg.sender;
    }

    //1. Stakes Tokens (depose money )
    function stakeTokens(uint _amount) public {

        //Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        //Transfer Mock Dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        //Update the staking Balence
        stakingBalence[msg.sender] = stakingBalence[msg.sender] + _amount;

        //Add users to stakers arrau * only if they haven't staked already
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }
        //Update staking status
        isStaking[msg.sender]= true;
        hasStaked[msg.sender]= true;

    

    }

    // Issuing Tokens 
    function issueTokens() public{
        //Only owner can call this function 
        require(msg.sender == owner, "caller must be the owner of the app");

        //Issue tokens of all stakers
        for(uint i=0; i<stakers.length; i++){
           address recipient =  stakers[i];
           uint balance = stakingBalence[recipient];
           if(balance > 0){
                daapToken.transfer(recipient,balance);
           }
        }
    }

    // Unstaking Tokens (Withdraw)
    function unstakeTokens() public{
        //fetch the staking balance 
        uint balance = stakingBalence[msg.sender];

        //Require amount greater than 0
        require(balance > 0, "staking balance  cannot be 0");

        //Transfer Mock Dai tokens to this contract for staking 
        daiToken.transfer(msg.sender, balance);

        //Reset staking balance 
        stakingBalence[msg.sender] = 0;

        //Update staking status 
        isStaking[msg.sender]= false;

    }

}
