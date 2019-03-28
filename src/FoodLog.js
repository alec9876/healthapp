import React, {Component} from 'react';

class FoodLog extends Component {
    constructor(){
        super();
        this.state = {
            nutrition: [],
            search: "",
            selectFood: null
        }
    }

    gettingCalories = (cal) => {
        const calories = localStorage.getItem("calorieCount") ? parseInt(localStorage.getItem("calorieCount")) : 0;
        localStorage.setItem("calorieCount", calories + parseInt(cal)) 
        // calories are equal to the present amount of food object, and 'cal' is the running total of all calories logged
        
    }

    // enables typing in Input
    onSearchChange = event => {
        this.setState({ search: event.target.value });
      }

      // API Call
      async getFoods(){ // async uses await so that it can get the fetch before response is called
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
                          body: JSON.stringify({"query":`${this.state.search}`,"timezone":"America/New_York","line_delimited":false,"use_raw_foods":false,"use_branded_foods":false}),
                          headers: new Headers(headers)
        }); 
        const json = await res.json();
        console.log(json)
        this.setState({nutrition: json.foods});
      }
  
    render(){
    return (
        <div>
            <div className="div-food-cal">
                <input className="food-input" 
                    placeholder="'1 apple' or '3 eggs' or 'bowl of oatmeal'... "
                    type="text"
                    value={this.state.search}
                    onChange={this.onSearchChange}
                /><br className="break"/> {/* break shows on screens smaller that 452px 
                 button calls API    */}
                <button className="button-cal-food" onClick={() => this.getFoods()}>
                    Calculate Food
                </button>
            </div>
            <div className="food-info">
                <ul>
                    {/* displays the api call (i.e. food item) */}
                    {this.state.nutrition.map((n, i) => (
                        <div key={i}>
                        <li>    
                        <img src={n.photo.thumb} />
                            <h2 className="food-name">{n.food_name}</h2>
                            <span className="food-cal-title">Calories:</span>
                            <span className="food-cal-data">{n.nf_calories}</span><br/>
                        </li>
                        {/* Calories added to local storage, displays on home page */}
                        <button class="button-add-cal" onClick={() => this.gettingCalories(n.nf_calories)}>
                        Add Calories
                        </button>
                        </div>
                    ))}
                    
                </ul>
            </div>
        </div>
        )
    }
}

export default FoodLog;