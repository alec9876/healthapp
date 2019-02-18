import React from 'react';


const Header = props =>
  <header>
    <div className='header-container'>
        <h1 className="header-h1"><a href="#">HealthWatch</a></h1>
        <nav>
            <ul className="navigation">
                <li><a href="#">FoodLog</a></li>
                <li><a href="#">Exercise</a></li>
                <li><a href="#">Eateries</a></li>
            </ul>
        </nav>
    </div>
        
  </header>;

  export default Header;