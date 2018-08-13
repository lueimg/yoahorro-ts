import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import OperationTypes from '../../shared/helper/OperationTypes';
class Calculator extends Component {

  constructor(props) {
    super();
  }


  handleCalculator(input) {
    this.props.handleInput(input);
  };
  render() {
    return (
      <Grid container>
        {
          [1, 2, 3, OperationTypes.sum,
            4, 5, 6, OperationTypes.rest,
            7, 8, 9, OperationTypes.multiplication,
            OperationTypes.point, 0, OperationTypes.equal, OperationTypes.division]
            .map(input => (
              <Grid item xs={3}                   key={input}
>
                <Button
                  className="Keyboard-item"
                  onClick={() => this.handleCalculator(input)}
                  color="primary">
                  {input}
                 </Button>
              </Grid>
            ))
        }

      </Grid>
    );
  }
}

export default Calculator;

