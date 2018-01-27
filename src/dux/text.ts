import { Record } from 'immutable';

export const TEXT_TYPE = 'TEXT_TYPE';

enum TextActionType {
  UPDATE,
}

interface IUpdatePayload {
  text: string,
}

type Payload =
  | IUpdatePayload;

interface ITextAction {
  payload: Payload;
  type: TextActionType;
}

export interface ILabeledTextAction {
  type: string;
  inner: ITextAction;
}

export type TextActionCreator = (payload: Payload) => ILabeledTextAction;

export interface ITextState {
  value: string,
}

export type TextState = Record<ITextState>;

const makeActionCreator: (actionCreator: (payload: Payload) => ITextAction) => TextActionCreator =
  (actionCreator) => (payload) => ({
    inner: actionCreator(payload),
    type: TEXT_TYPE,
  });

export const updateText: TextActionCreator =
  makeActionCreator((payload: Payload) => ({
    payload,
    type: TextActionType.UPDATE,
  }));

const reducers = {
  [TextActionType.UPDATE]: (state: TextState, action: ITextAction): TextState => (
    state.set('value', action.payload.text)
  ),
};

const makeTextState: Record.Factory<ITextState> = Record({
  value: '',
});

export const reducer = (
  state: (TextState | undefined) = makeTextState(),
  action: (ITextAction | undefined) = undefined,
) => {
  if (state === undefined) {
    return state;
  } else if (action === undefined) {
    return state;
  } else if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }

  return state;
};

