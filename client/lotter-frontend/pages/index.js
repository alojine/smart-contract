import React, { useEffect } from 'react'
import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import LoterryABI from '../contracts/Lottery.json'
import 'bulma/css/bulma.css'

export default function Home() {

  let account;

  const [web3, setWeb3] = useState()
  const [address, setAddress] = useState()
  const [lotteryPlayers, setPlayers] = useState([])

  const connectWalletHandler = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
        const web3 = new Web3(window.ethereum)
        setWeb3(web3)
        const accounts = await web3.eth.getAccounts()
        setAddress(accounts[0])
        account = accounts[0];
        document.getElementById("owner-connection").innerHTML = account;
        console.log(account);

      } catch (err) {
        console.log(err.message)
      }
    }
  }

  const connectContract = async () => {
      const ABI = LoterryABI.ABI;
      const Address = "0x2647bCca7e87627A4c8b7B65B20b22B7b7672343";
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract(ABI, Address);
      document.getElementById("smart-contract-connection").innerHTML = "Connected smart contract";
    }

    const enterLottery = async () => {
      try{
        await window.contract.methods.enter().send({
          from: address,
          value: '10000000000000000',
          gas: 300000
        })
        console.log(address);
        const response = contract.methods.getBalance().call();
        document.getElementById("entered-players").innerHTML = response/1000000000000000000;
      }
      catch(err){
        console.log(err);
      }
    }

    const pickWinner = async () => {
      try {
        const winner = await window.contract.methods.pickWinner().send({
          from: address,
          gas: 300000,
          gasPrice: null
        });
        console.log(address);
        document.getElementById("winner").innerHTML.html = winner;
      } catch (err) {
        console.log(err);
      }
    }


  return (
    <div>
      <Head>
        <title id="connect-metamask">Ether lottery</title>
        <meta name="description" content="Lottery for smart contract dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <nav className="navbar mt-4 mb-4">
          <div className="container">
            <div className="navbar-brand">
              <h1>Ether Lottery</h1>
            </div>
            <div className="navbar-end">
              <button onClick={connectWalletHandler} className="button is-link">Connect wallet</button>
            </div>
          </div>
        </nav>
        <div className="container">
          <section className="mt-5">
            <div className="columns">
              <div className="column is-two-thirds">
                <section className="mt-6">
                  <p><b>Owner only: </b>Connect smart contract</p>
                  <button className="button is-success is-large is-light" onClick={connectContract}>Connect</button>
                  <p id="smart-contract-connection"></p>
                </section>
                <section className="mt-5">
                  <p>Enter the lottery</p>
                  <button className="button is-link is-large is-light" onClick={enterLottery} >Enter</button>
                  <p id="entered-players">0</p>
                </section>
                <section className="mt-6">
                  <p><b>Owner only: </b>Pick a winner</p>
                  <button className="button is-success is-large is-light" onClick={pickWinner} >Pick winner</button>
                </section>
              </div>
              <div className="column is-one-third">

              <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Owner</h2>
                        <div className="owner-entry">
                          <p id="owner-connection"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* winner */}
                <section className="mt-5">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        <h2>Winner</h2>
                        <div id="winner">null</div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}