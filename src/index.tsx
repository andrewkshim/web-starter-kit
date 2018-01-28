import * as React from 'react';
import * as ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';

import {
  applyMiddleware,
  createStore,
} from 'redux';

// @ts-ignore: react-router-reduxdoes not have redux@4.0 compatible typings right now
import { routerMiddleware } from 'react-router-redux';

import App from './App';
import RouteProvider from './RouteProvider';
import reducers from './dux';

const history = createHistory();

const middleware = applyMiddleware(
  routerMiddleware(history),
);

const store = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <RouteProvider history={history}>
      <App message='web-starter-kit' />
    </RouteProvider>
  </Provider>,
  document.getElementById('root'),
);
