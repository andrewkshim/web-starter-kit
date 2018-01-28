import * as React from 'react';
import * as ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    // @ts-ignore: GRAPHCOOL_URI provided by webpack.DefinePlugin
    uri: GRAPHCOOL_URI,
  }),
});

const history = createHistory();

const middleware = applyMiddleware(
  routerMiddleware(history),
);

const store = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <RouteProvider history={history}>
        <App message='web-starter-kit' />
      </RouteProvider>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);
