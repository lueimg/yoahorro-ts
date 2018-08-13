import * as React from 'react';
import { connect } from 'react-redux'

import { TransactionsActions } from '../../store/actions/transactionActions';
import { getAll } from '../../store/reducers/predefineExpensesReducer';


class Records extends React.Component<any, any> {

  static defaultProps = {
  }

  defaultState = {
    
  }

  state = { ...this.defaultState }
  componentDidMount() {
    this.props.actions.getTransactions();
  }

  public render() {
    return (
      <div className="App-list">
                {this.props.transactions
                    .sort((transactionA, transactionB) => {
                        return new Date(transactionA.createdAt) > new Date(transactionB.createdAt)
                    })
                    .reverse()
                    .map((transaction) => {
                        return <div
                            key={transaction.id}
                            className="App-list-item">
                            <div className="App-list-item-left">
                                <div>
                                    S./{transaction.amount}
                                </div>
                                <div>
                                    {new Date(transaction.createdAt).getHours() + 1} : {new Date(transaction.createdAt).getMinutes() + 1}
                                </div>
                            </div>
                            <div className="App-list-item-right">
                                <div className="App-list-item-account-transaction">
                                    <div className="App-list-item-account">
                                        {transaction.account} -
                      </div>
                                    <div className="App-list-item-transaction">
                                        - {transaction.transactionType === 'income' ? 'I' : 'O'}
                                    </div>
                                </div>
                                <div className="App-list-description">
                                    {transaction && transaction.description}
                                </div>
                            </div>
                            <br />
                        </div>
                    })}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Records)
