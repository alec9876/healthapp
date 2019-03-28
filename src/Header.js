import React from 'react';
import {NavLink} from 'react-router-dom';
import Sidebar from './Sidebar';


const Header = props =>
  <header>
    <div className='header-container'>
        <h1 className="header-h1"><NavLink exact to="/">HealthWatch</NavLink></h1>
        
        <nav className="nav-display">
            <ul className="navigation">
                <li><NavLink to="/foodlog">FoodLog</NavLink></li>
                <li><NavLink to="/exercise">Exercise</NavLink></li>
                <li><NavLink to="/eateries">Eateries</NavLink></li>
            </ul>
        </nav>
    </div>
    <Sidebar pageWrapId={"page-wrap"} outerContainerId={"Header"}  />
        
  </header>;

  export default Header;