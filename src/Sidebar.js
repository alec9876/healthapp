import React from "react";
import { slide as Menu } from "react-burger-menu";

export default props => {
  return (
    // Pass on our props
    <Menu {...props}>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="./FoodLog">
        FoodLog
      </a>

      <a className="menu-item" href="./Exercise">
        Exercises
      </a>

      <a className="menu-item" href="./Eateries">
        Eateries
      </a>
    </Menu>
  );
};