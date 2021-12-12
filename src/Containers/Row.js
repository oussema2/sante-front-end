import React from "react";

const Row = (props) => {
  return (
    <div
      {...props}
      className={`display-flex
      flexDirection-row
    
         flex-1 ${props.classes}`}
    >
      {props.children}
    </div>
  );
};

export default Row;
