import { Record } from 'immutable';
import { Action as ReduxAction } from 'redux';

import {
  COUNTER_TYPE,
  CounterState,
  ILabeledCounterAction,
  reducer as counterReducer,
} from './counter';

import {
  IRouteAction,
  ROUTE_TYPE,
  RouteState,
  routeReducer,
} from './route';

import {
  ILabeledTextAction,
  TEXT_TYPE,
  TextState,
  reducer as textReducer,
} from './text';

type LabeledAction =
  | ILabeledCounterAction
  | ILabeledTextAction
  | IRouteAction;

type Action =
  | LabeledAction
  | ReduxAction;

function isCounterAction(action: Action): action is ILabeledCounterAction {
  return (action as ILabeledCounterAction).type === COUNTER_TYPE;
}

function isTextAction(action: Action): action is ILabeledTextAction {
  return (action as ILabeledTextAction).type === TEXT_TYPE;
}

function isRouteAction(action: Action): action is IRouteAction {
  return (action as IRouteAction).type === ROUTE_TYPE;
}

export interface IState {
  counter: CounterState;
  route: RouteState;
  text: TextState;
}

const makeState: Record.Factory<IState> = Record({
  counter: counterReducer(),
  route: routeReducer(),
  text: textReducer(),
});


type State = Record<IState>;

const reducer = (
  state: (State | undefined) = makeState(),
  action: Action,
): State => {
  if (isCounterAction(action)) {
    return state.update(
      'counter',
      (counter) => counterReducer(counter, action.inner),
    );
  } else if (isTextAction(action)) {
    return state.update(
      'text',
      (text) => textReducer(text, action.inner),
    );
  } else if (isRouteAction(action)) {
    return state.update(
      'route',
      (route) => routeReducer(route, action),
    );
  }

  return state;
};

export default reducer;

