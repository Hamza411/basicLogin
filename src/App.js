import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FormikForm from './Components/FormikForm';
import WelcomePage from './Components/WelcomePage';
import Registration from './Components/Registration';
import ProtectedRoute from './Components/ProtectedRoute';
// import Header from './Components/Header';
import CreateTask from './Components/CreateTask';
import AppContainer from './Components/appContainer'
import Table from './Components/Table';


function App(props) {

  // console.log("apps called")

  return (

    <div>
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/" component={FormikForm} /> */}
          <ProtectedRoute exact path="/" component={FormikForm} />
          <ProtectedRoute exact path="/formik" component={FormikForm} />

          <AppContainer exact path="/login">
            <FormikForm />
          </AppContainer>

          <ProtectedRoute exact path="/createTask" component={CreateTask} />
          <Route exact path="/table" component={Table} />
          <ProtectedRoute exact path="/registration" component={Registration} />
          <ProtectedRoute exact path="/welcome" component={WelcomePage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;