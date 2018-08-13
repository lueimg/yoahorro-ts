import { Action } from '../../shared/models/redux-utils';
import { AppActionTypes } from '../actions/AppActions';

export interface IAppReducer {
    isLoading: boolean
}
const defaultState: IAppReducer = {
    isLoading: true
}
export default function AppReducer(state: IAppReducer = defaultState, action: Action) {
  switch (action.type) {
    case AppActionTypes.loaded:
      return { isLoading: false }
    default:
      return state
  }
}
