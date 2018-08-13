import { AuthActionTypes } from "../actions/auth";
import { Action } from '../../shared/models/redux-utils';


export interface IUserReducer {
    errorMessage?: string;
    uid?: string;
    email?: string;
}

export default function userReducer (state: IUserReducer = null, action: Action): IUserReducer {
    
    switch (action.type) {
        case AuthActionTypes.login_success:
            return { ...action.payload, errorMessage: null }
        case AuthActionTypes.login_error:
            return { errorMessage: action.payload }
        case AuthActionTypes.logout:
            return null;
        default:
            return state;
    }
}