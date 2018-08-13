import * as React from "react";
import * as moment from "moment";
import { FormGroup, FormControlLabel, Checkbox, TextField } from "@material-ui/core";
import HttpService from "../../../../shared/services/HttpService";
import ReportRow from "./ReportRow";
import "./styles.css";
import { ExpenseModel } from '../../../../shared/models/ExpenseModel';


interface MonthlyExpenses {
  [key: number]: ExpenseModel[]
}

export class ReportDailyExpense extends React.Component {
  state = {
    today: moment(),
    dateFieldValue: moment().format("YYYY-MM-DD"),
    lastDay: moment().endOf("month").format("DD"),
    expenses: [],
    userA: true,
    userB: true,
    monthTotal: 0
  };

  componentDidMount() {
    this.loadDailyExpense();
  }

  async loadDailyExpense() {
    const documents = await HttpService.getDiaryExpense();
    const expenses = this.normalizeExpensesInCollections(documents);

    await HttpService.getFamily();

    this.setState({ expenses, monthTotal: this.getMonthTotal(expenses) });
  }

  normalizeExpensesInCollections (documents = {}): MonthlyExpenses {
    return Object.keys(documents).reduce((acc, id) => {
      const key = +documents[id].day.split("-")[2];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push({ ...documents[id] });
      return acc;
    }, {});
  }

  getMonthTotal (items) {
    return Object.keys(items)
    .reduce((acc, key) => acc + items[key]
      .reduce((acc, {amount}) => acc + +amount, 0), 0)
  }

  getRange(amount) {
    return Array.apply(null, Array(amount)).map((x, i) => i + 1);
  }

  handleChange = user => () => {
    this.setState({ [user]: !this.state[user] });
  };

  updateDate = (event) => {
    console.log('event: ', event);
  }
  

  render() {

    return (
      <div>
        <div className="accumulated margin-left-one">
          <div className="date margin-one">
            <TextField
              id="date"
              label="Dia"
              type="date"
              onChange={this.updateDate}
              value={this.state.dateFieldValue}
            />
          </div>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.userA}
                  onChange={this.handleChange("userA")}
                  value="checkedA"
                />
              }
              label="Genesis"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.userB}
                  onChange={this.handleChange("userB")}
                  value="checkedB"
                  color="primary"
                />
              }
              label="Luis"
            />
          </FormGroup>

          <div className="totals margin-one">
            <span>Total hasta la fecha: s/. {this.state.monthTotal} </span>
          </div>
        </div>
        {this.getRange(+this.state.lastDay).map(row => (
          <ReportRow key={row} date={row} items={this.state.expenses[row]} />
        ))}
      </div>
    );
  }
}

export default ReportDailyExpense;
