import React from 'react'
import ReactDOM from 'react-dom'
import { compose } from 'recompose'
import { Provider as StoreProvider } from 'react-redux'

import store from './store'
import App from './App'

console.log('===== web-starter-kit =====');

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);
