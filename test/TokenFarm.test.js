const { assert } = require('chai')


const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
    .use(require('chai-as-promised'))
    .should()
function token(n){
    return web3.utils.toWei(n,'ether')
}

contract('TokenFarm', ([owner, investor]) =>{
    let daiToken, dappToken, tokenFarm 


    before(async()=>{
        //load Contracts 
        daiToken = await DaiToken.new()
        dappToken = await DappToken.new()
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

        //Transfer all DappToken and DaiToken to FarmToken 
        await dappToken.transfer(tokenFarm.address, token('1000000'))
        // Send tokens to investor 
        await daiToken.transfer(investor,token('100'), {from: owner} )
    })

    describe('Mock DAI deployement', async()=>{
        it('has a name', async()=>{ 
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('DApp Token deployement', async()=>{
        it('has a name', async()=>{ 
            const name = await dappToken.name()
            assert.equal(name, 'DApp Token')
        })
    })

    describe('Token Farm deployement', async()=>{
        it('has a name', async()=>{ 
            const name = await tokenFarm.name()
            assert.equal(name, 'Dapp Token Farm')
        })

        it('contract has tokens', async()=>{ 
            let balance = await dappToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(), token('1000000'))
        })
    })


    describe('Farming tokens', async()=>{
        it('rewards investors for staking mDai tokens', async()=>{
            let result

            //Check investor balance before staking 
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(),token('100'), 'investor Mock DAI wallet balance correct before staking')
            await daiToken.approve(tokenFarm.address,token('100'), {from: investor})

            //Stake Mock DAI tokens 
            await tokenFarm.stakeTokens(token('100'), {from: investor})


            //check staking result 
            result= await daiToken.balanceOf(investor)
            assert.equal(result.toString(), token('0'), 'investor Mock DAI wallet balance correct after staking')


            result= await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), token('100'), 'Token Farm Mock DAI balance correct after staking')

            result= await tokenFarm.stakingBalence(investor)
            assert.equal(result.toString(), token('100'), 'investor staking balance correct after staking')

            result= await tokenFarm.isStaking(investor)
            assert.equal(result.toString(), 'true', 'investor staking status correct after staking')

        })
    })
})


