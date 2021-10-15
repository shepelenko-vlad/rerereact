import React from 'react';
import AppLayout from "./Components/AppLayout";
import AdminPanel from './Components/AdminPanel';
import TableMasks from './Components/TableMasks';
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
            <Route path="/">
              <AppLayout />
            </Route>
          </Switch>
      </Router>
    </>
  );
}

export default App;
