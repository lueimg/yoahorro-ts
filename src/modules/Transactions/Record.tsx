import * as React from 'react';
import { connect } from 'react-redux'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { TransactionsActions } from '../../store/actions/transactionActions';
import { getAll } from '../../store/reducers/predefineExpensesReducer';

export interface RecordProps {
  actions: any,
  transactions: any[]
}

class Record extends React.Component<RecordProps, any> {

  static defaultProps = {
  }

  defaultState = {
    transactionType: 'expense',
    account: 'cash',
    category: categories['expense'][0],
    subCategory: subCategories[categories['expense'][0]][0],
    amount: 0,
    description: '',
    transactions: [],
    savingTransaction: false,
  }

  state = { ...this.defaultState }
  componentDidMount() {
    this.props.actions.getTransactions();
  }

  handleTransactionTypeChange = (event) => {
    this.setState({
      transactionType: event.target.value,
      category: categories[event.target.value][0]
    })
  }
  handleAccountChange = (event) => {
    this.setState({
      account: event.target.value,
    })
  }
  handleCategoryChange = (event) => {
    this.setState({
      category: event.target.value,
      subCategory: subCategories[event.target.value][0]
    })
  }
  handleSubCategoriesChange = (event) => {
    this.setState({
      subCategory: event.target.value,
    })
  }

  sendData = () => {
    const { transactions, savingTransaction, ...rest } = this.state;
    this.props.actions.saveTransaction(rest);
  }

  setDescription = (description) => (e) => {
    this.setState({ description });
  }

  handleTypeahead = (test) => {
    this.setState({ description: test.target.value })
  }

  setAmount = (e) => {
    this.setState({
      amount: parseFloat(e.target.value)
    })
  }

  public render() {
    return (
      <div className="App-form-data-container">
        <FormControl>
          <InputLabel htmlFor="age-transaction-type">Transaction Type</InputLabel>
          <Select
            value={this.state.transactionType}
            onChange={this.handleTransactionTypeChange}
          >
            <MenuItem value={"income"}>Income</MenuItem>
            <MenuItem value={"expense"}>Expense</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="age-transaction-type">Account</InputLabel>
          <Select
            value={this.state.account}
            onChange={this.handleAccountChange}
          >
            <MenuItem value={"card"}>card</MenuItem>
            <MenuItem value={"cash"}>cash</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="age-transaction-type">Category</InputLabel>
          <Select
            value={this.state.category}
            onChange={this.handleCategoryChange}
          >
            {
              categories[this.state.transactionType].map((category) =>
                <MenuItem key={category} value={category}>{category}</MenuItem>)
            }

          </Select>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="age-transaction-type">Sub Category</InputLabel>
          <Select
            value={this.state.subCategory}
            onChange={this.handleSubCategoriesChange}
          >
            {
              subCategories[this.state.category].map((subCategory) =>
                <MenuItem key={subCategory} value={subCategory}>{subCategory}</MenuItem>)
            }

          </Select>
        </FormControl>

        <TextField
          id="amount"
          label="amount"
          onChange={this.setAmount}
          margin="normal"
        />
        <FormControl>
          <TextField
            id="description"
            value={this.state.description}
            label="description"
            onChange={this.handleTypeahead}
            margin="normal"
          />
          {
            Array.from(new Set([...this.props.transactions.map(t => t.description)]))
              .filter(description => {
                return description.toLowerCase().indexOf(this.state.description.toLowerCase()) >= 0
              })
              .map((description) =>
                <MenuItem
                  key={description}
                  value={description}
                  onClick={this.setDescription(description)}>{description}</MenuItem>)
          }

        </FormControl>
        <Button variant="contained" disabled={this.state.savingTransaction} color="primary" onClick={this.sendData}>
          Save
                    <i className="material-icons md-36">save</i>

        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    transactions: getAll(state.transactions)
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: {
      getTransactions() { dispatch(TransactionsActions.get()) },
      saveTransaction(transaction) { dispatch(TransactionsActions.save(transaction)) }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Record)

const categories = {
  expense: [
    'transport',
    'food',
    'entertainment',
    'health_fitness',
    'household',
    'communication',
    'education',
    'shopping',
  ],
  income: [
    'salary',
    'rents'
  ]
}

const subCategories = {
  transport: [
    'public_transportation',
    'taxi',
    'long_distances'
  ],
  food: [
    'restaurant',
    'groceries',
    'fast_food'
  ],
  entertainment: [
    'drinks',
    'hobbies',
    'books',
    'audio',
    'streaming',
    'life_events',
    'trips',
  ],
  health_fitness: [
    'doctor',
    'pharmacy',
    'sports',
  ],
  household: [
    'internet',
    'accommodation',
    'repairs',
    'energy',
  ],
  communication: [
    'phone',
    'internet'
  ],
  education: [
    'online_subscriptions',
    'university',
    'master',
    'books',
  ],
  shopping: [
    'others',
    'clothes',
    'shoes',
    'electronics',
    'accesories',
    'home',
    'stationery',
    'tools'
  ],
  salary: [
    'payment',
    'bonus',
  ],
  rents: [
    'first_floor',
    'third_floor_A',
    'third_floor_B',
  ]
}