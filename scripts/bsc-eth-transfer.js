const BridgeBsc = artifacts.require('./BridgeBsc.sol');

const privKey = '54dad62968e13d682a4d01884cbedb95835dbd2d72cee7063d6e9e92558ee8a4';

module.exports = async done => {
  const nonce = 7; //Need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  const bridgeBsc = await BridgeBsc.deployed();
  const amount = 1000;
  const message = web3.utils.soliditySha3(
    {t: 'address', v: accounts[0]},
    {t: 'address', v: accounts[0]},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce},
  ).toString('hex');
  const { signature } = web3.eth.accounts.sign(
    message, 
    privKey
  ); 
  await bridgeBsc.burn(accounts[0], amount, nonce, signature);
  done();
}