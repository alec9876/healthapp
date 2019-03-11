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

    onSearchChange = event => {
        this.setState({ search: event.target.value });
      }

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
      }
    render(){
    return (
        <div>
            <input
                type="text"
                value={this.state.search}
                onChange={this.onSearchChange}
            />
            <button onClick={() => this.getFoods()}>
                Calculate Food
            </button>
            <ul>
                {this.state.nutrition.map((n, i) => (
                    <div key={i}>
                    <li>    
                     <img src={n.photo.thumb} />
                        <h2>{n.food_name}</h2>
                        <span>Calories: {n.nf_calories}</span><br/>
                        <span>Protein: {n.nf_protein}</span><br/>
                        <span>Carbohydrates: {n.nf_total_carbohydrate}</span><br/>
                        <span>Fat: {n.nf_total_fat}</span><br/>
                    </li>
                    <button onClick={() => this.gettingCalories(n.nf_calories)}>
                    Add Calories
                    </button>
                    </div>
                ))}
                
            </ul>
        </div>
        )
    }
}

export default FoodLog;