import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './components/App'

import { Provider, Client, defaultExchanges } from 'urql'

const client = new Client({
  url: 'http://localhost:4000',
  exchanges: defaultExchanges
})
ReactDOM.render(
  <BrowserRouter>
    <Provider value={client}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)