import React from 'react';

import Nav from './components/nav';
import Ticket_component from './components/ticket';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import user_component from './components/user';
import Priorities_component from './components/priority';
import Status_component from './components/status';
import Engineer_component from './components/engineer';
import Resource_component from './components/resource';
import Category_component from './components/category';

function App() {
  
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/engineers" component={Engineer_component}/>
          <Route path="/resources" component={Resource_component}/>
          <Route path="/users" component={user_component}/>
          <Route path="/tickets" component={Ticket_component}/>
          <Route path="/priorities" component={Priorities_component}/>
          <Route path="/statuses" component={Status_component}/>
          <Route path="/categories" component={Category_component}/>
        </Switch>
      </div>
    </Router>
  )
}

const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
);

export default App;
