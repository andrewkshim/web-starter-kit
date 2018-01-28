import * as React from 'react';
import { connect } from 'react-redux';

// @ts-ignore: react-hot-loader@4.0 does not have typings right now
import { hot } from 'react-hot-loader';

import * as classes from './App.css';

import { IState } from './dux/index';
import compose from './utils/compose';

import {
  CounterActionCreator,
  decrement,
  increment,
} from './dux/counter';

import {
  RouteActionCreator,
  RouteLocation,
  pushRoute,
} from './dux/route';

import {
  TextActionCreator,
  updateText,
} from './dux/text';

interface IProps {
  counter: number;
  message: string;
  text: string;
  location: RouteLocation;

  decrement: CounterActionCreator;
  increment: CounterActionCreator;

  pushRoute: RouteActionCreator;

  updateText: TextActionCreator;
}

const enhance = compose(
  hot(module),
  connect(
    (state: IState) => ({
      counter: state.counter.get('value', 0),
      location: state.route.location,
      text: state.text.get('value', ''),
    }),
    {
      decrement,
      increment,
      pushRoute,
      updateText,
    },
  ),
);

class App extends React.Component<IProps, {}> {
  render() {
    const {
      counter,
      decrement,
      increment,
      location,
      message,
      pushRoute,
      text,
      updateText,
    } = this.props;

    return (
      <h1 className={ classes.root }>
        { message }
        <div>
          { counter }
          <button onClick={() => increment()}>INCREMENT</button>
          <button onClick={() => decrement()}>DECREMENT</button>
          <input
            type='text'
            value={ text }
            onChange={(ev) => {
              updateText({
                text: ev.target.value,
              });
            }}
          />
        </div>
        Location: { location.pathname }
        <div>
          <button onClick={() => pushRoute('/foo')}>foo</button>
          <button onClick={() => pushRoute('/bar')}>bar</button>
        </div>
      </h1>
    );
  }
}

export default enhance(App);
