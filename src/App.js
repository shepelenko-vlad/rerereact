import React from 'react';
import AppLayout from "./Components/AppLayout";
import AdminPanel from './Components/AdminPanel';
import LoginForm from './Components/LoginForm';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import './App.css';

function App() {
  return (
    <>
      <Router>
          <Switch>
            <Route path="/admin">
              <AdminPanel />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/">
              <AppLayout />
            </Route>
          </Switch>
      </Router>
    </>
  );
}

export default App;
