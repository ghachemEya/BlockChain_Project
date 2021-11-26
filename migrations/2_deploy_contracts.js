const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(deployer, network, accounts) {
  
  //Deploy Mock DAI Token 
  await deployer.deploy(DaiToken)
  const daiToken =  await DaiToken.deployed()

  //Deploy DappToken  
  await deployer.deploy(DappToken)
  const dappToken =  await DappToken.deployed()

  //Deploy th TokenFarm

  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
  const tokenFarm= await TokenFarm.deployed()

  //transfer the whole token from dapptoken to farmtoken
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000') 


  //Transfer 100 Mock DAI tokens to invester 
  await daiToken.transfer(accounts[1],'1000000000000000000000000' )
}
