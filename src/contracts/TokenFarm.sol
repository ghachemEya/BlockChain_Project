pragma solidity ^0.5.0;
import "./DappToken.sol";
import "./DaiToken.sol";


contract TokenFarm {
    // All code goes here...

    string public name = "Dapp Token Farm";
    DappToken public daapToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint ) public stakingBalence;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;


    constructor(DappToken _dappToken, DaiToken _daiToken) public{
       daapToken = _dappToken;
       daiToken = _daiToken;
    }

    //1. Stakes Tokens (depose money )
    function stakeTokens(uint _amount) public {

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


    //2. Unstaking Tokens (Withdraw)



    //3. Issuing Tokens 

    



}
