import { useState, useEffect, useContext } from 'react'
import { CoinContext } from './context/CoinContext'



function App() {
  const {allCoins, currency} = useContext(CoinContext);
  // console.log(show);
  // const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols=avax'

  return (
    <>
    <div>
      <h1>Coin data</h1>
      {allCoins.length === 0 ? (
        <p>Loading...</p>
      ): (
        <ul>
          {allCoins.map((coin) => (
            <li key={coin.id}> 
            {coin.name} - {currency.symbol}{coin.current_price}
            </li>
          ))}
        </ul>
      )}
    </div>

    </>
  )
}

export default App
