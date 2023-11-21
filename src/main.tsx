import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ResetStyle from './styles/ResetStyle.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <ResetStyle />
    <App />
  </React.Fragment>,
)
