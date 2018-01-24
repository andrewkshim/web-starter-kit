import * as React from 'react';
import { connect } from 'react-redux';

// @ts-ignore: react-hot-loader@4.0 does not have typings right now
import { hot } from 'react-hot-loader';

import * as classes from './App.css';

import { IState } from './dux/index';
import compose from './utils/compose';

import {
  ActionCreator,
  decrement,
  increment,
} from './dux/counter';

interface IProps {
  counter: number;
  message: string;

  decrement: ActionCreator;
  increment: ActionCreator;
}

const enhance = compose(
  hot(module),
  connect(
    (state: IState) => ({
      counter: state.counter.value,
    }),
    {
      decrement,
      increment,
    },
  ),
);

class App extends React.Component<IProps, {}> {
  render() {
    const {
      counter,
      message,
      increment,
      decrement,
    } = this.props;

    return (
      <h1 className={ classes.root }>
        { message }
        <div>
          { counter }
          <button onClick={() => increment()}>INCREMENT</button>
          <button onClick={() => decrement()}>DECREMENT</button>
        </div>
      </h1>
    );
  }
}

export default enhance(App);
