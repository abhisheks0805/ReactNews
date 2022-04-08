import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
       <Router>
        <NavBar></NavBar>
       
        <Switch>
          <Route exact path="/"><News></News></Route>
          <Route exact path="/general">
          <News key="general" pageSize={9} country="in" category="general"></News> 
          </Route>
          <Route exact path="/health">
          <News key="health" pageSize={9} country="in" category="health"></News>
          </Route>
          <Route exact path="/technology">
          <News key="technology" pageSize={9} country="in" category="technology"></News>
          </Route>
          <Route exact path="/science">
          <News key="science" pageSize={9} country="in" category="science"></News>
          </Route>
          <Route exact path="/sports">
          <News key="sports" pageSize={9} country="in" category="sports"></News>
          </Route>
          <Route exact path="/entertainment">
          <News key="entertainment" pageSize={9} country="in" category="entertainment"></News>
          </Route>
          <Route exact path="/business">
          <News key="business" pageSize={9} country="in" category="business"></News>
          </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}
