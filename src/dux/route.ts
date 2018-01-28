import { Location } from 'history';

import {
  LOCATION_CHANGE,
  push,
  routerReducer,
  // @ts-ignore: react-router-reduxdoes not have redux@4.0 compatible typings right now
} from 'react-router-redux';

type RouteActionType = LOCATION_CHANGE;

export interface IRouteAction {
  payload: Location;
  type: RouteActionType;
}

interface IRouteState {
  location: Location;
}

export type RouteLocation = Location;

export type RouteState = IRouteState;

export type RouteActionCreator = (args: string) => IRouteAction;

export const ROUTE_TYPE = LOCATION_CHANGE;

export const routeReducer = routerReducer;

export const pushRoute = push;

export type LocationChanger = (location: Location) => IRouteAction;

export const changeLocation: LocationChanger = (location: Location): IRouteAction => ({
  payload: location,
  type: LOCATION_CHANGE,
});
