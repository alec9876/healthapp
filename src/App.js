import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';


// Components
import FoodLog from './FoodLog.js';
// import Exercise from './Exercise';
// import Eateries from './Eateries';
// import Home from './Home';

class App extends Component {
  state={
    exercise: [],
    calories: []
  }

 /* async componentDidMount(){ // async uses await so that it can get the fetch before response is called
    const headers= {
      'Content-type': 'application/json',
      'x-app-id':'c060e6f7',
      'x-app-key': '7d88e5623346e2f4992628b5bcfac6c7',
      'x-remote-user-id': 0
    }

    const res = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients ", {
                      method: 'POST',
                      // withCredentials: true,
                      // credentials: 'include',
                      body: JSON.stringify({"query":`${this.setState.search}`,"timezone":"America/New_York","line_delimited":false,"use_raw_foods":false,"use_branded_foods":false}),
                      headers: new Headers(headers)
    }); 
    const json = await res.json();
    console.log(json)
    this.setState({nutrition: json.results});
  }

  generateSearchResults = search => {
    if(search === ""){
      return this.state.nutrients;
    }else {
      return this.state.nutrients
    }
  }

  selectFood = async (query) => {
    const res = await fetch(
      `https://trackapi.nutritionix.com/v2/natural/nutrients/${query}/`, 
      { cache: "force-cache" }
      )

    const json = await res.json()
    this.setState({
        foodInfo: json, 
        search: query
      })
  } */

 

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/foodlog" component={FoodLog}/>
          {/*<Route path="/exercise" component={Exercise}/>
          <Route path="/eateries" component={Eateries}/>  */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
