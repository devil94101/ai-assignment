import React, { InputHTMLAttributes } from "react";

interface props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = (props: props) => {
  return (
    <div className="w-full">
      <input className="input input-bordered w-full max-w-xs" {...props} />
      <div>
        <p className="text-error">{props.error || ""}</p>
      </div>
    </div>
  );
};

export default Input;
