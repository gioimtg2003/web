import  { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import Display from './components/Display.jsx'
import PlayerContextProvider from './components/PlayerContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <PlayerContextProvider>
    <App />
    </PlayerContextProvider>
   

    </BrowserRouter>
    
  </StrictMode>,
)

export default Display;