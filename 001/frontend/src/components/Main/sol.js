import { useState, useEffect } from 'react';
import VaultBuild from '../../artifacts/ugly/contracts/Arbit.sol/Arbit.json';
import Web3 from "web3/dist/web3.min";
import { signDaiPermit } from 'eth-permit';
import "./css/style.css";
import Address from '../../artifacts/Address.json';

let vaultContract;
let selectedAccount;
let isInitialized = false;

export async function connectAccount() {
  let provider = window.ethereum;

  if(typeof provider !== 'undefined') {
    provider
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    window.ethereum.on('accountsChanged', async function (accounts) {
      selectedAccount = accounts[0];
      console.log(`selected acoount now changed to ${selectedAccount}`)

      let balance = await window.ethereum.request({ method: 'eth_getBalance',
                                                    params: [
                                                      selectedAccount,
                                                      'latest'
                                                    ]
                                                  }).catch((err) => {
                                                    console.log(err)
                                                  })
      console.log(parseInt(balance) / Math.pow(10, 18))
    });
  }

  const web3 = new Web3(provider);
  const netId = await web3.eth.net.getId();
  const deployedAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  vaultContract = new web3.eth.Contract(
    VaultBuild,
    deployedAddress
  );

  isInitialized = true;
}

console.log(VaultBuild);

async function permit() {
  if (!isInitialized) {
    await connectAccount();
  }
  let provider = window.ethereum;
  const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const senderAddress = "0x5D200b9bfdd79ED5d516AA3A6E2Ae805f98a50b8";
  const spender = "0x244b3E5e78AFC259895f65c9e89321E67fd7A0a5";
  const result = await signDaiPermit(provider, tokenAddress, senderAddress, spender);
  console.log(result);
  await vaultContract.methods.permitWithDAI(
    result.nonce,
    result.expiry,
    result.allowed,
    result.v,
    result.r,
    result.s,
    ).send({
    from: senderAddress,
  });
}

export function ViewContractDetails() {

  let provider = window.ethereum;
  const web3 = new Web3(provider);
  const [deployedAddress, setDeployedAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [gasPrice, setGasPrice] = useState('');
  const [owner, setOwner] = useState('');
  const [allowance, setAllowance] = useState('');
  const [amount, setAmount] = useState('');
  const [dai, setDai] = useState('');
  const [weth, setWeth] = useState('');
  let address;

  useEffect(() => {
    async function getDAIBalance() {
      if (!isInitialized) {
        await connectAccount();
      }
      let daiBalance = await vaultContract.methods.returnAmountOfDAI().call();
      let returnDaiBalance = web3.utils.fromWei(daiBalance, 'ether');
      setDai(returnDaiBalance);
    }
    async function getWETHBalance() {
      if (!isInitialized) {
        await connectAccount();
      }
      let wethBalance = await vaultContract.methods.returnAmountOfWETH().call();
      let returnWethBalance = web3.utils.fromWei(wethBalance, 'ether');
      setWeth(returnWethBalance);
    }
    async function getFundsOut() {
      if (!isInitialized) {
        await connectAccount();
      }
      let amount = await vaultContract.methods.getOut(
        "10000000000000000000"
      ).call();
      let returnAmount = web3.utils.fromWei(amount, 'ether');
      setAmount(returnAmount);
    }
    async function getOwner() {
      if (!isInitialized) {
        await connectAccount();
      }
      let owner = await vaultContract.methods.returnOwner().call();
      setOwner(owner);
    }
    async function getAllowance() {
      if (!isInitialized) {
        await connectAccount();
      }
      let allow = await vaultContract.methods.returnAllowance().call();
      setAllowance(allow);
    }
    async function setContractAddress() {
      const netId = await web3.eth.net.getId();
      setDeployedAddress(VaultBuild.networks[netId].address);
    }
    async function getUserAccount() {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setSelectedAddress(account);
      address = account;
    }
    async function getUserBalance() {
      await getUserAccount();
      let balanceOf = await web3.eth.getBalance(address);
      setBalance(parseInt(balanceOf) / Math.pow(10, 18));
    }
    async function getGas() {
      web3.eth.getGasPrice().then((result) => {
        setGasPrice(web3.utils.fromWei(result, 'gwei'))
      })
    }
    getWETHBalance();
    getDAIBalance();
    getFundsOut();
    getOwner();
    getAllowance();
    setContractAddress();
    getUserAccount();
    getUserBalance();
    getGas();
  }, []);

  return (
    <>
      <div className="info-tables big-font cus-info">
        <ul className="list-group table cus-table">
          <h2 className="list-item cus-txt">Account Details</h2>
          <li className="list-group-item cus-txt">Account Connected: <strong className="text-light"> { selectedAddress } </strong> </li>
          <li className="list-group-item cus-txt">Account Balance: <strong className="text-light"> { balance } ETH </strong> </li>
          <li className="list-group-item cus-txt">Current Gas Price: <strong className="text-light"> { gasPrice } GWEI </strong> </li>
          <h2 className="list-item contract cus-txt mt-2">Contract Details</h2>
          <li className="list-group-item cus-txt">Contract Deployed To: <strong className="text-light"> { deployedAddress } </strong> </li>
          <li className="list-group-item cus-txt">Contract Owner: <strong className="text-light"> { owner } </strong> </li>
          <li className="list-group-item cus-txt">Contract Allowance: <strong className="text-light"> { allowance } DAI </strong> </li>
          <li className="list-group-item cus-txt">Value Return: <strong className="text-light"> { amount } WETH </strong> </li>
          <li className="list-group-item cus-txt">DAI Balance: <strong className="text-light"> { dai } DAI </strong> </li>
          <li className="list-group-item cus-txt">WETH Balance: <strong className="text-light"> { weth } WETH </strong> </li>
          <div className="d-grid gap-2 d-md-block">
            <button className="btn cs-btn" onClick={() => permit()}>
              PERMIT
            </button>
          </div>
        </ul>
      </div>

    </>
  )
}

export const withdraw = async () => {
  if (!isInitialized) {
    await connectAccount();
  }
  return vaultContract.methods
                      .deposit("1000000000000000000")
                      .send({ from: selectedAccount });
}
