import React, { Component } from 'react';

class Home extends Component {
    state={
        calories: localStorage.getItem("calorieCount") ? parseInt(localStorage.getItem("calorieCount")) : 0,
        exercises: parseInt(localStorage.getItem("calorieBurn")) 
      }


      clearCalories = () => {
        this.setState({calories: localStorage.clear() ? 0 : 0 });
      }
    
    render() {
    return (
    <div>
        <h1>Calories Consumed</h1>
            {this.state.calories} 
        <h1>Calories Expended</h1>
            {this.state.exercises}
        <div>
            <button onClick={() => this.clearCalories()}>
                Clear All Calories
            </button>   
        </div>
     </div>
    )
    }
}



export default Home;