import * as React from 'react'
import { hot } from 'react-hot-loader'

interface Props {
  message: string,
};

interface State {};

class App extends React.Component<Props, State> {
  render() {
    const { message } = this.props;
    return (
      <h1>
        { message }
      </h1>
    );
  }
}

export default hot(module)(App);
