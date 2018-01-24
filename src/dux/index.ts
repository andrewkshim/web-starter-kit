import {
  Reducer,
  Store as ReduxStore,
  combineReducers,
} from 'redux';

import counter, {
  IAction as ICounterAction,
  IState as ICounterState,
} from './counter';

export interface IState {
  counter: ICounterState;
}

type Action =
  | ICounterAction;

export type Store = ReduxStore<IState, Action, never>;

const reducer: Reducer<IState, Action> = combineReducers({
  counter,
});

export default reducer;
