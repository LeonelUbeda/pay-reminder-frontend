import React from 'react';
import { BrowserRouter as Router, Route, Switch,  } from "react-router-dom";
import Login from './pages/Login'
import Payments from './pages/Payments'
import TopMenu from './components/TopMenu';
import Groups from './pages/Groups'
import store, { actions } from './store';
import { getAllStoredGroups } from './localStorage/groups'
import { getAllStoredPayments } from './localStorage/payments'

import { Provider, connect } from 'unistore/react';

import { initialize } from './localStorage/defaultValues'






class App extends React.Component{

  componentDidMount(){

    initialize().then(() => {

      getAllStoredGroups().then(groups => {

        this.props.setGroupsToState(groups)
  
        getAllStoredPayments().then(payments => {

          this.props.setPaymentsToState(payments)
          this.props.setIsLoadingAppTo(false)
  
        }).catch((error) => {
          console.log(error)
        })
      })
    })
  }

  render(){
    if(this.props.isLoadingApp){
      return (
        <div></div>
      )
    }



    return (
      <Router>
          <TopMenu />
          <Switch>
            <div className="flex justify-center select-none">
              <div className="default-container">
    
                <Route exact path="/payments" component={Payments}/>
                <Route exact path="/groups" component={Groups}/>
                
              </div>
            </div>
          </Switch>
      </Router>
    );
  }
}


export default connect(['groups', 'isLoadingApp'], actions)(App)
