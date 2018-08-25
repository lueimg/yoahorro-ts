import * as React from "react";
import Main from "./modules/Main";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./modules/auth/Login";
import NoMatch from "./shared/ui/NoMatch";
import PrivateSection from "./shared/ui/PrivateRoute";
import Logout from './modules/auth/Logout';

import "./App.css";
import "./assets/css/flex.css"
import "./assets/css/helpers.css"

class App extends React.Component {
  redirectTo404 = () => {
    return <Redirect to="/404" />
  }
  componentDidMount () {
    // test purpose
  }

  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/404" component={NoMatch} />
            <PrivateSection>
              <Route exact path="/logout" component={Logout} />
              <Route path="/" component={Main} />
            </PrivateSection>
          </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
