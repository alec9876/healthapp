import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';


// Components
// import FoodLog from './FoodLog.js';
// import Exercise from './Exercise';
// import Eateries from './Eateries';
// import Home from './Home';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          {/* <Route exact path="/" component={Home} />
          <Route path="/foodlog" component={FoodLog} />
          <Route path="/exercise" component={Exercise}/>
          <Route path="/eateries" component={Eateries}/>  */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
