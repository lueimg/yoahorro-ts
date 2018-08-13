import HttpService from "../../shared/services/HttpService";
import { Dispatch } from "redux";
import { PredefinedExpense } from "../../shared/models/PredefinedExpense";

export const PredefinedExpensesActionTypes = {
    add: '[PREDEFINED EXPENSES] ADD',
    update: '[PREDEFINED EXPENSES] UPDATE',
    remove: '[PREDEFINED EXPENSES] REMOVE',
    load: '[PREDEFINED EXPENSES] load',
}


const getPredefinedExpenses = () => async (dispatch: Dispatch) => {
        const data = await HttpService.getPredefinedExpenses();
        dispatch({
            type: PredefinedExpensesActionTypes.load,
            payload: data
        })
}

const savePredefinedExpenses = () => async (dispatch: Dispatch) => {
    const predefined = new PredefinedExpense('Text', 1, new Date().getTime()) ;
    
    const doc = await HttpService.savePredefinedExpense(predefined);
    dispatch({
        type: PredefinedExpensesActionTypes.add,
        payload: { ...predefined, id: doc.id}
    })
}

const updatePredefinedExpenses = (payload: any) => async (dispatch: Dispatch) => {
    await HttpService.updatePredefinedExpense(payload);
    dispatch({
        type: PredefinedExpensesActionTypes.update,
        payload
    })
}

const removePredefinedExpense = (payload: any) => async (dispatch: Dispatch) => {
    await HttpService.removePredefinedExpense(payload);
    dispatch({
        type: PredefinedExpensesActionTypes.remove,
        payload
    })
}


export const PredefinedExpensesActions = {
    getPredefinedExpenses,
    savePredefinedExpenses,
    updatePredefinedExpenses,
    removePredefinedExpense
}