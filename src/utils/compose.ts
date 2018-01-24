/* tslint:disable */

// Source:
// https://github.com/acdlite/recompose/blob/1c3d2b38edb394db1144af9f078a73008c612f7f/src/packages/recompose/compose.js
const compose = (...funcs: Function[]): Function => (
  funcs.length === 0 ?
    (arg: any): any => arg
  : funcs.length === 1 ?
    funcs[0]
  :
    funcs.reduce((a, b) => (...args: any[]): any => a(b(...args)))
);

export default compose;

