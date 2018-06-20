
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';

export const add = ( amount ) => ({
  type: ADD,
  amount,
});

export const subtract = ( amount ) => ({
  type: SUBTRACT,
  amount,
});

const DEFAULT_STATE = Object.freeze({
  amount: 0,
});

const reducer = (state = DEFAULT_STATE, action = {}) => (
  action.type === ADD ?
    {
      ...state,
      amount: (state.amount || 0) + action.amount,
    }
  : action.type === SUBTRACT ?
    {
      ...state,
      amount: (state.amount || 0) - action.amount,
    }
  :
    state
);

export default reducer;

