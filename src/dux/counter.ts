import { Reducer } from 'redux';

enum ActionType {
  INCREMENT,
  DECREMENT,
}

export interface IState {
  value: number,
}

export interface IAction {
  type: ActionType;
}

export type ActionCreator = () => IAction;

export const increment: () => IAction =
  () => ({ type: ActionType.INCREMENT });

export const decrement: () => IAction =
  () => ({ type: ActionType.DECREMENT });

const DEFAULT_STATE = { value: 0 };

const reducers = {
  [ActionType.INCREMENT]: (state: IState): IState => ({
    value: state.value + 1,
  }),
  [ActionType.DECREMENT]: (state: IState): IState => ({
    value: state.value - 1,
  }),
};

const reducer: Reducer<IState, IAction> = (
  state: IState = DEFAULT_STATE,
  action: IAction,
) => (
  !reducers[action.type]
    ? state
    : reducers[action.type](state)
);

export default reducer;
