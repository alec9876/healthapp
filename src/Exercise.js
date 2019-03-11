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

gettingExercise = (cal) => {
    localStorage.setItem("calorieBurn", parseInt(cal));
}

onSearchChange = event => {
    this.setState({ search: event.target.value });
  }

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

  generateSearchResults = search => {
    if(search === ""){
      return this.state.exercise;
    }else {
      return this.state.exercise
    }
  }

  selectExercise = async (query) => {
    const res = await fetch(
      `https://trackapi.nutritionix.com/v2/exercise/log/${query}/`, 
      { cache: "force-cache" }
      )

    const json = await res.json()
    this.setState({
        exerciseInfo: json, 
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
        <button onClick={() => this.getExercise()}>
            Calculate Exercise
        </button>
        <ul>
            {this.state.exercise.map((n, i) => (
                <div key={i}>
                <li>    
                    <span>Calories: {n.nf_calories}</span><br/>
                </li>
                <button onClick={() => this.gettingExercise(n.nf_calories)}>
                Add Calories Burned
                </button>
                </div>
            ))}
            
        </ul>
    </div>
    )
}
}


export default Exercise;
