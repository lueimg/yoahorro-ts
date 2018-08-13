import { TransactionsActionTypes } from "../actions/transactionActions";


const defaultState = {
}

export interface ITransactionReducer {
    errorMessage?: string;
}

export function getAll(state: any) {
    return Object.keys(state).map( item => state[item]) || [];
}

export default function PredefinedExpenses (state = defaultState, action: any ): ITransactionReducer { 
    switch (action.type) {
        case TransactionsActionTypes.load:
            return action.payload;
        case TransactionsActionTypes.save:
        default:
            return state;
    }
}