import { combineReducers } from 'redux';
import PredefinedExpenses from './predefineExpensesReducer';
import userReducer, { IUserReducer } from './userReducer';
import AppReducer, { IAppReducer } from './AppReducer';
import TransactionsReducer, { ITransactionReducer } from './transactionsReducer';


export interface IStore {
    predefinedExpenses: any
    user: IUserReducer,
    app: IAppReducer
    transactions: ITransactionReducer,
}

const rootReducer = combineReducers({
    predefinedExpenses: PredefinedExpenses,
    user: userReducer,
    app: AppReducer,
    transactions: TransactionsReducer
});

export default rootReducer;