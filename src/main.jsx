import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './componants/Boutton.css'
import './componants/Pokemon.css'
import './componants/pvbarre.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <App />
    
  </StrictMode>,
)
