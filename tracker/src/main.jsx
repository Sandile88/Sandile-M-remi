import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CoinContextProvider } from './context/CoinContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoinContextProvider>
    {/* now all the components inside the app component can access the context  data */}
        <App /> 
    </CoinContextProvider>
  </StrictMode>,
 
)
 