import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import Home from './Home';
import AboutMe from './AboutMe';
import ContactMe from './ContactMe';
import EWB from './EWB';
import Manulife from './Manulife';
import MCC from './MCC';
import Resume from './Resume';
import Tangerine from './Tangerine';
import UTATInclusion from './UTAT-Inclusion'; 
import UTATSS from './UTAT-SS';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Components.css';

ReactDOM.render(
  <Router history={history}>
  <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/about-me">
        <AboutMe />
      </Route>
      <Route exact path="/contact-me">
        <ContactMe/>
      </Route>
      <Route exact path="/ewb">
        <EWB/>
      </Route>
      <Route exact path="/manulife">
        <Manulife/>
      </Route>
      <Route exact path="/mcc">
        <MCC/>
      </Route>
      <Route exact path="/resume">
        <Resume/>
      </Route>
      <Route exact path="/tangerine">
        <Tangerine/>
      </Route>
      <Route exact path="/utat-inclusion">
        <UTATInclusion/>
      </Route>
      <Route exact path="/utat-ss">
        <UTATSS/>
      </Route>
  </Switch>
</Router>,
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
