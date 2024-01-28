import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QuizContextProvider } from './context/QuizContext'
import { ModalContextProvider } from './context/ModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuizContextProvider>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </QuizContextProvider>
  </React.StrictMode>,
)
