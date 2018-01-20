import * as React from 'react'
import * as ReactDOM from 'react-dom'

console.log('===== web-starter-kit =====');

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

ReactDOM.render(
  <App message='web-starter-kit' />,
  document.getElementById('root')
);
