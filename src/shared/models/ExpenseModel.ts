import * as moment from "moment";

export class ExpenseModel {
    id: string;
    day: string;
    createdAt: number;
    category: string;
    description: string;
    amount: any;
    
    constructor({ day, createdAt, category, description, amount, id = 0 } = {} as any) {
        this.day = day || moment().format("YYYY-MM-DD");
        this.createdAt = createdAt || new Date().getTime()
        this.category = category = '';
        this.description = description || '';
        this.amount = amount || '';
        this.id = id;
    }

}