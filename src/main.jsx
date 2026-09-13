import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {UsuarioProvider} from './Context/UsuarioContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const idClienteGoogle = import.meta.VITE_API_GOOGLE_CLIENT_ID

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={idClienteGoogle} >
      <UsuarioProvider>
      <App />
     </UsuarioProvider>
    </GoogleOAuthProvider>   
  </StrictMode>,
)
