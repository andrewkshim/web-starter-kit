export const COUNTER_TYPE = 'COUNTER_TYPE';

enum CounterActionType {
  INCREMENT,
  DECREMENT,
}

interface ICounterAction {
  type: CounterActionType;
}

type CounterAction = ICounterAction | undefined;

export interface ILabeledCounterAction {
  type: string;
  inner: ICounterAction;
}

export type CounterActionCreator = () => ILabeledCounterAction;

export interface ICounterState {
  value: number,
}

type CounterState = ICounterState | undefined;

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
  [CounterActionType.INCREMENT]: (state: ICounterState): ICounterState => ({
    value: state.value + 1,
  }),
  [CounterActionType.DECREMENT]: (state: ICounterState): ICounterState => ({
    value: state.value - 1,
  }),
};

const DEFAULT_COUNTER_STATE = { value: 0 };

export const reducer = (
  state: CounterState = DEFAULT_COUNTER_STATE,
  action: CounterAction = undefined,
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

