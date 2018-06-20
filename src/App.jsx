import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import { add, subtract } from './dux'

const enhance = compose(
  connect(
    ({ amount }) => ({
      amount,
    }),
    {
      onAdd: add,
      onSubtract: subtract,
    }
  ),
);

const App = ({
  amount,
  onAdd,
  onSubtract,
}) => (
  <div>
    <h1>web-starter-kit</h1>
    <div>Amount: {amount}</div>
    <button onClick={() => onAdd(1)}>
      Increment
    </button>
    <button onClick={() => onSubtract(1)}>
      Decrement
    </button>
  </div>
);

export default enhance(App);

