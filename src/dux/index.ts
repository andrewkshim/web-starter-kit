import {
  Action as ReduxAction,
  Reducer,
  Store as ReduxStore,
} from 'redux';

import {
  COUNTER_TYPE,
  DEFAULT_COUNTER_STATE,
  ICounterState,
  ILabeledCounterAction,
  reducer as counterReducer,
} from './counter';

import {
  DEFAULT_TEXT_STATE,
  ILabeledTextAction,
  ITextState,
  TEXT_TYPE,
  reducer as textReducer,
} from './text';

export interface IState {
  counter: ICounterState;
  text: ITextState;
}

type State = IState | undefined;

type LabeledAction =
  | ILabeledCounterAction
  | ILabeledTextAction;

type Action =
  | LabeledAction
  | ReduxAction;

export type Store = ReduxStore<State, Action, never>;

function isCounterAction(action: Action): action is ILabeledCounterAction {
  return (action as ILabeledCounterAction).type === COUNTER_TYPE;
}

function isTextAction(action: Action): action is ILabeledTextAction {
  return (action as ILabeledTextAction).type === TEXT_TYPE;
}

const DEFAULT_STATE = {
  counter: DEFAULT_COUNTER_STATE,
  text: DEFAULT_TEXT_STATE,
};

const reducer: Reducer<State, Action> = (
  state: State = DEFAULT_STATE,
  action: Action,
) => {
  if (isCounterAction(action)) {
    return {
      ...state,
      counter: counterReducer(state.counter, action.inner),
    };
  } else if (isTextAction(action)) {
    return {
      ...state,
      text: textReducer(state.text, action.inner),
    };
  }

  return state;
};

export default reducer;

