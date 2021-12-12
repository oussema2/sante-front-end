import React from "react";

const Text = (props) => {
  return <p className={`${props.classes}`}>{props.text}</p>;
};

export default Text;
