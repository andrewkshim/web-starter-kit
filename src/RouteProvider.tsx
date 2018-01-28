import * as React from 'react';
import { connect } from 'react-redux';

import {
  History,
  Location,
} from 'history';

import { IState } from './dux';

import {
  LocationChanger,
  changeLocation,
} from './dux/route';

import compose from './utils/compose';

interface IProps {
  history: History;
  changeLocation: LocationChanger;
}

const enhance = compose(
  connect(
    (state: IState) => ({}),
    {
      changeLocation,
    },
  ),
);

class RouteProvider extends React.Component<IProps, {}> {

  _unsubscribe: Function | null = null;

  componentWillMount() {
    const { history } = this.props;
    this._unsubscribe = history.listen(this._handleLocationChange);
    this._handleLocationChange(history.location);
  }

  componentWillUnmount() {
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
  }

  render() {
    return this.props.children;
  }

  _handleLocationChange = (location: Location) => {
    const { changeLocation } = this.props;
    changeLocation(location);
  }

}

export default enhance(RouteProvider);
