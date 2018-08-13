import * as React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import { getAll } from '../../store/reducers/transactionsReducer';
import { connect } from 'react-redux'
import { TransactionsActions } from '../../store/actions/transactionActions';
type Props = {
  actions: any,
  transactions: any[]
}
export class Transactions extends React.Component<Props, any> {

  static defaultProps = {
  }

  defaultState = {
    savingTransaction: false,
    categories: {
      transport: 0,
      food: 0,
      entertainment: 0,
      health_fitness: 0,
      household: 0,
      communication: 0,
      education: 0,
      shopping: 0,
    },
    cash: 0,
    card: 0,
    total: 0,
    transactions: []
  }

  state = { ...this.defaultState }

  componentDidMount() {
    this.props.actions.get();
  }

  calculateAmounts() {
    const money = {
      categories: {
        transport: 0,
        food: 0,
        entertainment: 0,
        health_fitness: 0,
        household: 0,
        communication: 0,
        education: 0,
        shopping: 0,
      },
      cash: 0,
      card: 0,
      total: 0,
    }
    this.props.transactions.forEach(item => {
      const sign = item.transactionType === 'expense' ? -1 : +1
      if (sign < 0) {
        money.categories[item.category] = money.categories[item.category] + item.amount
        money.total = money.total + item.amount;
      }
      if (item.account === 'cash') {
        money.cash = money.cash + item.amount * sign;
      }
      if (item.account === 'card') {
        money.card = money.card + item.amount * sign;
      }
    });

    return { ...money }
  }
  render() {
    const data = this.calculateAmounts();
    return (
      <div>
        <Dashboard
          cash={data.cash}
          card={data.card}
          total={data.total}
          categories={data.categories} />
      </div>
    )
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
      get() { dispatch(TransactionsActions.get()) }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
