import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './Header';


// Components
import FoodLog from './FoodLog.js';
import Exercise from './Exercise';
import Eateries from './Eateries';
import Home from './Home';

class App extends Component {
  state={
    calories: localStorage.getItem("calorieCount") ? parseInt(localStorage.getItem("calorieCount")) : 0,
    exercises: localStorage.getItem("calorieBurn") ? parseInt(localStorage.getItem("calorieBurn")) : 0,
    eateries: []
  }

  // All State info shows in Home component

  render() {
    console.log(this.state);
    return (
      <div>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/foodlog" component={FoodLog}/>
            <Route path="/exercise" component={Exercise}/>
            <Route path="/eateries" component={Eateries} />
          </Switch>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
