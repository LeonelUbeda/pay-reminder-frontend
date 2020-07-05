import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Payments from "./pages/Payments";
import TopMenu from "./components/TopMenu";
import Groups from "./pages/Groups";
import HistoryItem from "./pages/History";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { actions } from "./store";
import { getAllStoredGroups } from "./localStorage/groups";
import { getAllStoredPayments } from "./localStorage/payments";

import { connect } from "unistore/react";

import { initialize } from "./localStorage/defaultValues";
import { getAllStoredHistories } from "./localStorage/history";
import Payment from './Classes/Payment'

class App extends React.Component {
  componentDidMount() {
    initialize().then(() => {
      Promise.all([
        getAllStoredGroups(),
        getAllStoredPayments(),
        getAllStoredHistories(),
      ]).then(([groups, payments, histories]) => {
        this.props.setGroupsToState(groups);
        this.props.setPaymentsToState(payments);
        this.props.setHistoriesToState(histories);
        console.log(payments.length);
        this.props.setIsLoadingAppTo(false);
      });
    });
  }

  render() {
    if (this.props.isLoadingApp) {
      return <h1>Loading</h1>;
    }
    return (
      <Router>
        <TopMenu />
        <div className="flex justify-center select-none pt-10">
          <div className="default-container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/payments" component={Payments} />
              <Route
                path={"/payments/:paymentId/history"}
                component={HistoryItem}
              />
              <Route exact path="/groups" component={Groups} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(["groups", "isLoadingApp"], actions)(App);
