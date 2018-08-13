import * as React from 'react'
import { connect } from 'react-redux'
import { getAll } from '../../../store/reducers/predefineExpensesReducer';
import Payment from './Payment';

export class MonthlyPayments extends React.Component<any, any> {

  render() {
    return (
      <div>
        {this.props.payments && this.props.payments.map((item: any) => (
          <Payment key={item.id} {...item}  />
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  payments: getAll(state.predefinedExpenses) || []
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyPayments)





