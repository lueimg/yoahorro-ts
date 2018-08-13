import React, { Component } from 'react';
import Calculator from './Calculator';
import Calculate from '../../shared/helper/Calculate';
import Button from '@material-ui/core/Button';
// beta
class NewRecord extends Component {
  constructor() {
    super()
    this.state = {
      total: null,
      next: null,
      operation: null,


      transactionType: 'expense',
      account: 'cash',
      category: '',
      subCategory: '',
      amount: 0,
      description: '',
      transactions: [],
      savingTransaction: false,
    }
  }

  handleInputCalculartor(input) {
    const result = Calculate.runCalculation(this.state, input);
    this.setState(result)
  }

  clearInput() {
    this.setState(Calculate.resetCalculation());
  }

  handleAccount(type) {
    this.setState({
      
    })
  }

  render() {
    return (
      <div>
        <p>{new Date().getDate()}</p>
        <Button variant="contained" color="primary" onClick={() => this.handleAccount('card')}>
          <i className="material-icons md-36">credit_card</i>
        </Button>
        <Button variant="contained" color="primary" onClick={() => this.handleAccount('cash')}>
          <i className="material-icons md-36">money</i>
        </Button>
        <p>{Math.round((this.state.next || this.state.total) * 100) / 100}</p>
        <Button variant="contained" color="primary" onClick={() => this.clearInput()}>
          <i className="material-icons md-36">delete</i>
        </Button>
        <Calculator
          className="Transaction-calculator"
          handleInput={(e) => this.handleInputCalculartor(e)}
        />
      </div>
    );
  }
}

export default NewRecord;