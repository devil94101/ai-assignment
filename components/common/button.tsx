import React from "react";

interface props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: props) => {
  return (
    <button
      className={props.className + " btn btn-outline"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
