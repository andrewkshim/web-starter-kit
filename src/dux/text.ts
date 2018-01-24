import { Reducer } from 'redux';

enum TextActionType {
  UPDATE,
}

export interface ITextState {
  value: string,
}

interface IUpdatePayload {
  text: string,
}

type Payload =
  | IUpdatePayload;

export interface ITextAction {
  payload: Payload;
  type: TextActionType;
}

export const TEXT_TYPE = 'TEXT_TYPE';

export interface ILabeledTextAction {
  type: string;
  inner: ITextAction;
}

export type ActionCreator = (payload: Payload) => ILabeledTextAction;

const makeActionCreator: (actionCreator: (payload: Payload) => ITextAction) => ActionCreator =
  (actionCreator) => (payload) => ({
    inner: actionCreator(payload),
    type: TEXT_TYPE,
  });

export const update: ActionCreator =
  makeActionCreator((payload: Payload) => ({
    payload,
    type: TextActionType.UPDATE,
  }));

export const DEFAULT_TEXT_STATE = { value: '' };

const reducers = {
  [TextActionType.UPDATE]: (state: ITextState, action: ITextAction): ITextState => ({
    value: action.payload.text,
  }),
};

export const reducer: Reducer<ITextState, ITextAction> = (
  state: ITextState = DEFAULT_TEXT_STATE,
  action: ITextAction,
) => (
  !reducers[action.type]
    ? state
    : reducers[action.type](state, action)
);

