import React from 'react';
import { BrowserRouter as Router, Switch,  } from "react-router-dom";
import {connect} from 'unistore/react'
import { actions } from './store'
import Login from './pages/Login'
import Payments from './pages/Payments'
import TopMenu from './components/TopMenu';
import { isUserIsLoggedIn } from './utils/login';


class App extends React.Component{
  constructor(props){
    super(props)

  }

  componentDidMount(){
    isUserIsLoggedIn()
    .then((token) => {
      this.props.setTokenUser(token)
      this.props.setUserLoggedStatus(true)
      this.props.setIsLoadingAppTo(false)
    })
    .catch(() => {
      this.props.setIsLoadingAppTo(false)
      console.log('Nel')
    })

  }



  render(){

    if(this.props.isLoadingApp){
      return <div></div>
    }



    return (
          <Router>
            <TopMenu />
            <Switch>
              <div className="flex justify-center ">
                <div className="default-container">
                  <Router path="/login">
                    <Login/>
                  </Router>
      
                  <Router path="/payments">
                    <Payments/>
                  </Router>
              </div>
              </div>
            </Switch>
          </Router>
  
    );
  }
}


export default connect(['isLoadingApp'],actions)(App)
