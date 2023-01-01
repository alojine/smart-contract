import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import 'bulma/css/bulma.css'

export default function Home() {

  let account;

  const [web3, setWeb3] = useState()
  const [address, setAddress] = useState()

  const connectWalletHandler = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {

        await window.ethereum.request({ method: "eth_requestAccounts" })
        const web3 = new Web3(window.ethereum)
        setWeb3(web3)

        const accounts = await web3.eth.getAccounts()
        setAddress(accounts[0])

      } catch (err) {
        console.log(err.message)
      }
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
              <div id="connect-metamask"></div>
            </div>
          </div>
        </nav>
        <div className="container">
          <section className="mt-5">
            <div className="columns">
              <div className="column is-two-thirds">
                <section className="mt-5">
                  <p>Enter the lottery</p>
                  <button onlick={enter} className="button is-link is-large is-light">Enter</button>
                  <p>Entered players</p>
                </section>
                <section className="mt-6">
                  <p><b>Owner only: </b>Pick a winner</p>
                  <button className="button is-success is-large is-light">Pick winner</button>
                </section>
              </div>
              <div className="column is-one-third">
                {/* <section className="mt-5">
                  <div class="card">
                    <div class="card-content">
                      <div class="content">
                        <h2>Lottery History</h2>
                        <div className="history-entry">
                          <div>
                            Lottery #1 winner:
                          </div>
                          <div>
                            0x4D89efb84f646aFdfa4520BD1bf2c06a825B8d2A
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section> */}

                <section className="mt-5">
                  <div class="card">
                    <div class="card-content">
                      <div class="content">
                        <h2>Players (1)</h2>
                        <div className="history-entry">
                          <div id="entered-players">
                            0
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mt-5">
                  <div class="card">
                    <div class="card-content">
                      <div class="content">
                        <h2>Pot Size</h2>
                        <p>10 Ether</p>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section className="mt-5">
                  <div class="card">
                    <div class="card-content">
                      <div class="content">
                        <h2>Winner</h2>
                        <p><div id="winner">null</div></p>
                      </div>
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </section>
        </div>
      </main>

      {/* <footer className={styles.footer}>
      

      </footer> */}
    </div>
  )
}
