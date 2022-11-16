import { useState } from 'react';
import './css/styleBox.css';
import VaultBuild from '../../artifacts/ugly/contracts/Arbit.sol/Arbit.json'
import Web3 from "web3/dist/web3.min";

let vaultContract;
let selectedAccount;
let isInitialized = false;

async function initiate() {
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
  const deployedAddress = VaultBuild.networks[netId].address;
  vaultContract = new web3.eth.Contract(
    VaultBuild.abi,
    deployedAddress
  );

  isInitialized = true;
}

async function swapByUniswap(_amountIn, _amountOutMin, _sushiswapAmountOutMin) {
  if (!isInitialized) {
    await initiate();
  }
  await vaultContract.methods.arbitrageSwapFromUniswap(
    _amountIn,
    _amountOutMin,
    _sushiswapAmountOutMin
  ).send({
    from: "0x32E5802Bca3a3f08b56a6Ca8935Bf1C7d8a1504A",
  });
}

async function swapBySushiswap(_amountIn, _amountOutMin, _uniswapAmountOutMin) {
  if (!isInitialized) {
    await initiate();
  }
  await vaultContract.methods.arbitrageSwapFromSushiswap(
    _amountIn,
    _amountOutMin,
    _uniswapAmountOutMin
  ).send({
    from: "0x32E5802Bca3a3f08b56a6Ca8935Bf1C7d8a1504A",
  });
}


export function Box() {
  initiate();
  const [values, setValues] = useState({
    inAmount: "",
    minAmountOut: "",
    amountOut: "",
  });
  const handleFirstInputChange = (event) => {
    setValues({...values, inAmount: event.target.value})
  }
  const handleLastInputChange = (event) => {
    setValues({...values, minAmountOut: event.target.value})
  }
  const handleInputChange = (event) => {
    setValues({...values, amountOut: event.target.value})
  }
  const handleUniswapSubmit = (event) => {
    event.preventDefault();
    console.log(
      values
    );
    swapByUniswap(values.inAmount, values.minAmountOut, values.amountOut);
  }
  const handleSushiswapSubmit = (event) => {
    event.preventDefault();
    console.log(
      values
    );
    swapBySushiswap(values.inAmount, values.minAmountOut, values.amountOut);
  }
  return (
    <div className="swap">
      <div className="container">
        <div className="card">
          <div className="contents">
            <h2>01</h2>
            <h3>Arbitrage Swap</h3>
            <div className="inputGang">
              <div className="inputBox">
                <input type="number" required="required"
                onChange={handleFirstInputChange}
                id="first-name"
                value={values.inAmount}
                className="form-field"
                name="firstName"></input>
                <span>Input Amount</span>
              </div>
              <div className="inputBox">
                <input type="number" required="required"
                onChange={handleLastInputChange}
                id="last-name"
                value={values.minAmountOut}
                className="form-field"
                name="lastName"></input>
                <span>Min Amount Out</span>
              </div>
              <div className="inputBox">
                <input type="number" required="required"
                onChange={handleInputChange}
                id="last-name"
                value={values.amountOut}
                className="form-field"
                name="lastName"></input>
                <span>2 Min Amount Out</span>
              </div>
            </div>
            <button className="form-field" onClick={handleUniswapSubmit}>SWAP UNI!</button>
            <button className="form-field" onClick={handleSushiswapSubmit}>SWAP SUSHI!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
