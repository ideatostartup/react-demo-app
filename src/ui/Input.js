import React from "react";

const defaultStyle = {
  border: "none",
  borderBottom: "1px solid #bbb",
  marginTop: 20,
  paddingBottom: 5,
  fontSize: 14,
  lineHeight: 1.5,
  width: "100%"
}

const Input = ({ 
  placeholder, 
  style, 
  onChange, 
  defaultValue,
  type = "text" 
}) => {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        ...defaultStyle,
        ...style
      }}
    />
  );
};


export default Input;