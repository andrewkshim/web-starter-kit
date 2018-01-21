import * as React from 'react';
import * as ReactDOM from 'react-dom';

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

ReactDOM.render(
  <App message='web-starter-kit' />,
  document.getElementById('root'),
);
