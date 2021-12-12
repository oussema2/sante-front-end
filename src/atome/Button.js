import React from "react";

const Button = (props) => {
  return (
    <button
      type={props.type ? props.type : "button"}
      onClick={props.clickEvent}
      className={` ${props.classes} width-${props.width}px height-${props.height}px  bgr-orange fontSize-20px  border-radius-5px`}
    >
      {props.text}
    </button>
  );
};

export default Button;
