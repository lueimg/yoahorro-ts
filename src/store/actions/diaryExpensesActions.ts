import HttpService from "../../shared/services/HttpService";
import { Dispatch } from "redux";

export const DiaryExpensesActionTypes = {
    add: '[DIARY EXPENSES] ADD',
    update: '[DIARY EXPENSES] UPDATE',
    remove: '[DIARY EXPENSES] REMOVE',
    load: '[DIARY EXPENSES] load',
}


const get = () => async (dispatch: Dispatch) => {
        const data = await HttpService.getDiaryExpense();
        dispatch({
            type: DiaryExpensesActionTypes.load,
            payload: data
        })
}

const save = (payload: any) => async (dispatch: Dispatch) => {
    const response = await HttpService.saveDiaryExpense(payload);
    dispatch({
        type: DiaryExpensesActionTypes.add,
        payload
    })
    return response;
}

const update = (payload: any) => async (dispatch: Dispatch) => {
    await HttpService.updateDiaryExpense(payload);
    dispatch({
        type: DiaryExpensesActionTypes.update,
        payload
    })
}

const remove = (payload: any) => async (dispatch: Dispatch) => {
    await HttpService.removeDiaryExpense(payload);
    dispatch({
        type: DiaryExpensesActionTypes.remove,
        payload
    })
}


export const DiaryExpensesActions = {
    get,
    save,
    update,
    remove
}