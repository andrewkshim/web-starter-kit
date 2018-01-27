import { Record } from 'immutable';

import {
  Action as ReduxAction,
} from 'redux';

import {
  COUNTER_TYPE,
  CounterState,
  ILabeledCounterAction,
  reducer as counterReducer,
} from './counter';

import {
  ILabeledTextAction,
  TEXT_TYPE,
  TextState,
  reducer as textReducer,
} from './text';

export interface IState {
  counter: CounterState;
  text: TextState;
}

type State = Record<IState>;

type LabeledAction =
  | ILabeledCounterAction
  | ILabeledTextAction;

type Action =
  | LabeledAction
  | ReduxAction;

function isCounterAction(action: Action): action is ILabeledCounterAction {
  return (action as ILabeledCounterAction).type === COUNTER_TYPE;
}

function isTextAction(action: Action): action is ILabeledTextAction {
  return (action as ILabeledTextAction).type === TEXT_TYPE;
}

const makeState: Record.Factory<IState> = Record({
  counter: counterReducer(),
  text: textReducer(),
});

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
  }

  return state;
};

export default reducer;

