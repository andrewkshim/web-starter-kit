import * as React from 'react';
import { hot } from 'react-hot-loader';

import * as classes from './App.css';

interface IProps {
  message: string,
}

class App extends React.Component<IProps, {}> {
  render() {
    const { message } = this.props;

    return (
      <h1 className={ classes.root }>
        { message }
      </h1>
    );
  }
}

export default hot(module)(App);
