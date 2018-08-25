import * as React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';

export default class LoanItem extends React.Component<any, any> {

  static defaultProps = {
    progress: 30,
    amount : 800,
    startDate: '2018-07-12',
    endDate: '2018-08-12',
    interest: '10%',
    whom: 'Adrian',
    description: ''
  }

  render() {
    return (
      <div className="loan-item">
        <div className="descriptions">
        ({this.props.whom}) - s./ { this.props.amount} - Interes: { this.props.interest}
        </div>
        <LinearProgress variant="determinate" value={this.props.progress} />
        <div className="dates">
          Inicio: { this.props.startDate} - Finaliza: { this.props.endDate}
        </div>
      </div>
    );
  }

}