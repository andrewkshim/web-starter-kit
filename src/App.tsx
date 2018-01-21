import * as React from 'react'
import { hot } from 'react-hot-loader'

interface IProps {
  message: string,
}

class App extends React.Component<IProps, {}> {
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
