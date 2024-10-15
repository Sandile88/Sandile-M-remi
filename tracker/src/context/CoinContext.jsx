import { createContext, useEffect, useState } from "react";


export const CoinContext = createContext(); //added coincontext using the createcontext function

const CoinContextProvider = (props) => { 

    const [allCoins, setAllCoins] = useState([]); // initialize as an empty array because the data from the api will be retrived in the form of an array
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    const fetchAllCoins = async () => {
        const options = {
            method: 'GET'
        }
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
        .then(res => res.json())
        .then(res => setAllCoins(res))
        .catch(err => console.error(err));
    }
    // console.log(fetchAllCoins());

    useEffect(() => {
        fetchAllCoins();
    }, [currency])

    const contextValue = {  //declare any data
        allCoins, currency, setCurrency

        
    }

    return (
        // using the provider and the value, the data(contextValue)  can be passed in other components
        <CoinContext.Provider value={contextValue}>  
            {props.children}
        </CoinContext.Provider>
    )
}

export {CoinContextProvider};