import React from 'react'
import ReactDOM from 'react-dom/client'
import emailjs from '@emailjs/browser'
import App from './App'
import './index.css'

emailjs.init({ publicKey: 'I9jsCcLG5BmWrWZXx' })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
) 