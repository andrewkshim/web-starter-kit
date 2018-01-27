import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import reducers from './dux';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App message='web-starter-kit' />
  </Provider>,
  document.getElementById('root'),
);
