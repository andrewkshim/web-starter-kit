import { Record } from 'immutable';

export const COUNTER_TYPE = 'COUNTER_TYPE';

enum CounterActionType {
  INCREMENT,
  DECREMENT,
}

interface ICounterAction {
  type: CounterActionType;
}

export interface ILabeledCounterAction {
  type: string;
  inner: ICounterAction;
}

export type CounterActionCreator = () => ILabeledCounterAction;

export interface ICounterState {
  value: number,
}

export type CounterState = Record<ICounterState>;

const makeActionCreator: (actionCreator: () => ICounterAction) => CounterActionCreator =
  (actionCreator) => () => ({
    inner: actionCreator(),
    type: COUNTER_TYPE,
  });

export const increment: CounterActionCreator =
  makeActionCreator(() => ({
    type: CounterActionType.INCREMENT,
  }));

export const decrement: CounterActionCreator =
  makeActionCreator(() => ({
    type: CounterActionType.DECREMENT,
  }));

const reducers = {
  [CounterActionType.INCREMENT]: (state: CounterState): CounterState => (
    state.update('value', (value) => value + 1)
  ),
  [CounterActionType.DECREMENT]: (state: CounterState): CounterState => (
    state.update('value', (value) => value - 1)
  ),
};

const makeCounterState: Record.Factory<ICounterState> = Record({
  value: 0,
});

export const reducer = (
  state: (CounterState | undefined) = makeCounterState(),
  action: (ICounterAction | undefined) = undefined,
) => {
  if (state === undefined) {
    return state;
  } else if (action === undefined) {
    return state;
  } else if (reducers[action.type]) {
    return reducers[action.type](state);
  }

  return state;
};

