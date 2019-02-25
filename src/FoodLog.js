import React from 'react';

const FoodLog = props =>
<div>
    <input 
    type = "text"
    value = {props.search}
    onChange = {props.onSearchChange}
     />
     <textarea>
         {props.result.map(r => 
          props.selectFood(r.search)      
         )}
     </textarea>
</div>

export default FoodLog;