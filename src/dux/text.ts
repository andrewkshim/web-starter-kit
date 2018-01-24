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

type TextAction = ITextAction | undefined;

export interface ILabeledTextAction {
  type: string;
  inner: ITextAction;
}

export type TextActionCreator = (payload: Payload) => ILabeledTextAction;

export interface ITextState {
  value: string,
}

type TextState = ITextState | undefined;

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
  [TextActionType.UPDATE]: (state: ITextState, action: ITextAction): ITextState => ({
    value: action.payload.text,
  }),
};

const DEFAULT_TEXT_STATE: ITextState = { value: '' };

export const reducer = (
  state: TextState = DEFAULT_TEXT_STATE,
  action: TextAction = undefined,
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

