import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';


import Header from "./layout/Header";
import Dashboard from "./leads/Dashboard";

import Login from './accounts/Login'
import Register from './accounts/Register'

import PrivateRoute from "./common/PrivateRoute"

import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth'

/* import { render as Reach } from '../reach-integration/views/render' */
import Algosigner from './algosigner/Algosigner'
import { appRouter as Overview } from './overview/stateless/appRouter'

import CreateAccountPage from "../components/overview/pages/createaccountpage";
import RestoreAccountPage from "../components/overview/pages/restoreaccountcomponent";
import AccountPage from "../components/overview/pages/accountpage";
import TransactionPage from "../components/overview/pages/transactionpage"



//Alert Options
 const alertOptions = {
     timeout: 3000,
     position: 'top center'
 }

class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
    }
    render(){
        return(
            <Provider store={store}>
                <Router>
                <Fragment>
                    <Header />
                    <div className="container">
                    <Switch>
                        <PrivateRoute exact path="/" 
                        component={Dashboard} />
                         <Route exact path="/register" 
                        component={Register} />
                         <Route exact path="/login" 
                        component={Login} />
                       {/*  <PrivateRoute exact path="/reach"
                        component={Reach} /> */}
                        <PrivateRoute exact path="/algosigner"
                        component={Algosigner} /> 
                    </Switch>
                </div>
               </Fragment>
               </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));