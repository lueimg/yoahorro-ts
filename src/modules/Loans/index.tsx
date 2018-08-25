import * as React from "react";
import LoanService from './Service';
import { Divider, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import LoanItem from './LoanItem';

import './loans.css';

export class LoanModule extends React.Component<any, any> {

  state = {
    items: [],
    displayedItems: [],
    total: 0,
    whoms: []
  }

  async componentDidMount() {
    let items = await LoanService.getCurrentLoans();

    let total = 0;
    let list = new Set();
    
    items.forEach((loan: any) => {
      total = total + +loan.amount;
      list.add(loan.whom)
    })
    
    const whoms = [...list].map(who => ({ name: who, selected: true }))
    
    this.setState({ 
      items, 
      displayedItems: items,
      total,
      whoms
    });
  }

  setWhom = (selectedWhom) => () => {
    
    this.state.whoms.forEach(whom => {
      if (whom.name === selectedWhom.name) {
        whom.selected = !whom.selected;
      }
    });

    let displayedItems = this.state.items.filter(loan => 
      this.state.whoms.some(swhom => swhom.selected && swhom.name === loan.whom ));

      const total = displayedItems.reduce((acc, loan: any) => acc + +loan.amount, 0);

      this.setState({ 
        whoms: this.state.whoms.map(whom => ({...whom})), 
        displayedItems,
        total
      })
  }
  

  render() {
    return (
      <div>
        <div className="total">
          Prestado hasta la fecha: s./ {this.state.total}
        </div>

        <FormGroup row>
            { this.state.whoms.map(who => (
              <FormControlLabel key={who.name}
                control={
                  <Checkbox
                    checked={who.selected}
                    onChange={this.setWhom(who)}
                    value={who.name}
                  />
                }
                label={who.name}
              />
            ))}
          </FormGroup>


        <div className="loan-list">
          {this.state.displayedItems.map((loan) => ( 
            <React.Fragment key={loan.id}>
              <LoanItem {...loan} />
              <Divider />
            </React.Fragment> 
          ))}
        </div>
      </div>
    );
  }
}

export default LoanModule;