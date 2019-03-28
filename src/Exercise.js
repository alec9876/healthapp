import React, {Component} from 'react';
class Exercise extends Component {
constructor(){
    super();
    this.state = {
        exercise: [],
        search: "",
        selectExercise: null
    }
}

// stores calories into local storage, appears on Home page
gettingExercise = (cal) => {
    localStorage.setItem("calorieBurn", parseInt(cal));
}
// enables Input typing
onSearchChange = event => {
    this.setState({ search: event.target.value });
  }
  // API Call
  async getExercise(){ // async uses await so that it can get the fetch before response is called
    const headers= {
      'Content-type': 'application/json',
      'x-app-id':'c060e6f7',
      'x-app-key': '7d88e5623346e2f4992628b5bcfac6c7',
      'x-remote-user-id': 0
    }

    const res = await fetch("https://trackapi.nutritionix.com/v2/natural/exercise ", {
                      method: 'POST',
                      // withCredentials: true,
                      // credentials: 'include',
                      body: JSON.stringify({"query":`${this.state.search}`}),
                      headers: new Headers(headers)
    }); 
    const json = await res.json();
    console.log(json)
    this.setState({exercise: json.exercises});
  }

render(){
return (
    <div>
        <div className="div-exercise-cal">
            <input className="exercise-input"
                placeholder="'Ran 1 mile' or 'Jogged 30 minutes'..."
                type="text"
                value={this.state.search}
                onChange={this.onSearchChange}
            /><br className="break" /> {/* Break displays at 452px screen size and smaller
                Button displays the amount of calories burned */}
            <button className="button-cal-exercise" onClick={() => this.getExercise()}>
                Calculate Exercise
            </button>
        </div>
        <div className="exercise-info">
            <ul>
                {/* Displays calories burned */}
                {this.state.exercise.map((n, i) => (
                    <div key={i}>
                    <li>    
                        <span className="exercise-cal-title">Calories:</span>
                        <span className="exercise-cal-data">{n.nf_calories}</span><br/>
                    </li>
                    {/* Adds calories to local storage, appears on Home page */}
                    <button className="button-add-cal" onClick={() => this.gettingExercise(n.nf_calories)}>
                    Add Calories Burned
                    </button>
                    </div>
                ))}
                
            </ul>
        </div>
      </div>
    )
}
}


export default Exercise;
