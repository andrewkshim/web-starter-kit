import { Reducer } from 'redux';

enum CounterActionType {
  INCREMENT,
  DECREMENT,
}

export interface ICounterState {
  value: number,
}

export interface ICounterAction {
  type: CounterActionType;
}

export interface ILabeledCounterAction {
  type: string;
  inner: ICounterAction;
}

export type ActionCreator = () => ILabeledCounterAction;

export const COUNTER_TYPE = 'COUNTER_TYPE';

const makeActionCreator: (actionCreator: () => ICounterAction) => ActionCreator =
  (actionCreator) => () => ({
    inner: actionCreator(),
    type: COUNTER_TYPE,
  });

export const increment: ActionCreator =
  makeActionCreator(() => ({
    type: CounterActionType.INCREMENT,
  }));

export const decrement: ActionCreator =
  makeActionCreator(() => ({
    type: CounterActionType.DECREMENT,
  }));

export const DEFAULT_COUNTER_STATE = { value: 0 };

const reducers = {
  [CounterActionType.INCREMENT]: (state: ICounterState): ICounterState => ({
    value: state.value + 1,
  }),
  [CounterActionType.DECREMENT]: (state: ICounterState): ICounterState => ({
    value: state.value - 1,
  }),
};

export const reducer: Reducer<ICounterState, ICounterAction> = (
  state: ICounterState = DEFAULT_COUNTER_STATE,
  action: ICounterAction,
) => (
  !reducers[action.type]
    ? state
    : reducers[action.type](state)
);

