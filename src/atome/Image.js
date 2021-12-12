import React from "react";

const Image = (props) => {
  return (
    <img
      src={props.path}
      alt={props.path}
      className={`width-${props.width}px ${props.classes} `}
    />
  );
};

export default Image;
