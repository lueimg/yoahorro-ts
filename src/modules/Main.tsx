import * as React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { IStore } from "../store/reducers";
import { Expenses } from './Expenses/Expenses';
import Layout from "../shared/ui/Layout";
import Transactions from "./Transactions/Transactions";
import Record from "./Transactions/Record";
import Records from "./Transactions/Records";
import ModuleList from "./ModuleStore/ModuleList";

export class Main extends React.Component<any, any> {
  render() {
    return (
      <Layout>
          <Switch>
              <Route path="/expenses" component={Expenses} />
              <Route path="/transactions" component={Transactions} />
              <Route path="/record" component={Record} />
              <Route path="/records" component={Records} />
              <Route exact path="/" component={ModuleList} />
          </Switch>
        </Layout>
    );
  }
}

const mapStateToProps = ({ user }: IStore) => {
  return {
    user: user
  };
};

export default connect(mapStateToProps)(Main);