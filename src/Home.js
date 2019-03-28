import React, { Component } from 'react';

class Home extends Component {
    state={
        calories: localStorage.getItem("calorieCount") ? parseInt(localStorage.getItem("calorieCount")) : 0,
        exercises: localStorage.getItem("calorieBurn") ? parseInt(localStorage.getItem("calorieBurn")) : 0
        // stores both FoodLog component calories and Exercise component calories on Home page
      }

      // clear calories from Calories Consumed, Calories Expended, and Total Calories
      clearCalories = () => {
        this.setState({
            calories: localStorage.clear() ? 0 : 0,
            exercises: localStorage.clear() ? 0 : 0 
        });
        
      }

     
    
    render() {
        // Today's date
        var date = new Date();
        var day = date.getDate();
        var month = date.toLocaleString('en-us', {month: 'long'});
        var year = date.getFullYear();
        const topPad = {paddingTop: '1em'};
        const botPad = {paddingBottom: '1em'};
    return (  
    <div className="home-container">
        <h1 className="home-h1">HealthWatch</h1>
            <span className="home-subtitle">An app to help you make health-smart choices!</span>
            <span className="home-date">{month} {day}, {year}</span>
        <div className="home-info">
            <h2 className="home-h2" style={topPad}>Calories Consumed: <span>{this.state.calories}</span></h2>
                
            <h2 className="home-h2">Calories Expended: <span>{this.state.exercises}</span></h2>
               
            <h2 className="home-h2" style={botPad}>Total Calories: <span>{this.state.calories - this.state.exercises}</span></h2>        
        </div>
        <div className="home-button">
            <button className="button-clear" onClick={() => this.clearCalories()}>
                Clear All Calories
            </button>   
        </div>
        
     </div>
    )
    }
}



export default Home;