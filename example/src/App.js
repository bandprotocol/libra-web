import React from 'react'
import logo from './logo.svg'
import './App.css'

import { LibraClient, LibraNetwork, LibraWallet } from 'libra-web'

class App extends React.Component {
  onTransfer = async () => {
    const client = new LibraClient()
    const wallet = new LibraWallet(
      'silk rural awake receive timber bronze mutual message squeeze rug result shoot settle guide wheat believe dune fall share syrup picture true offer slow',
    )

    // TEST ACCOUNT CREATION
    const account1 = wallet.getAccount()
    const account1Address = account1.getAddress().toHex()
    console.log('User 1 address is', account1Address)

    const yAmount = 1e6
    const transferResult = await client.transferCoins(
      account1,
      '1dc70740d8ef845095db2cc1af5be777ff1fbfe4361cff36ff4c6952072b9296',
      yAmount,
    )

    console.log(transferResult)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p style={{ textAlign: 'center' }}>
            <button onClick={this.onTransfer}>Transfer</button>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
