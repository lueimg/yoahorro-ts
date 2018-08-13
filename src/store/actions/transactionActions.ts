import HttpService from "../../shared/services/HttpService";
import { Dispatch } from "redux";

export const TransactionsActionTypes = {
    save: '[TRANSACTIONS] SAVE',
    load: '[TRANSACTIONS] LOAD',
}

const get = () => async (dispatch: Dispatch) => {
        const data = await HttpService.getTransactions();
        dispatch({
            type: TransactionsActionTypes.load,
            payload: data
        })
}


const save = (payload: any) => async (dispatch: Dispatch) => {
    await HttpService.saveTransaction(payload);
    dispatch({
        type: TransactionsActionTypes.save,
        payload
    })
}
export const TransactionsActions = {
    get,
    save,
}