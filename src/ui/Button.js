import React from "react";

const defaultStyle = {
  backgroundColor: "#00A843",
  cursor: "pointer",
  width: 150,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  color: "#fff",
  fontFamily: ".AppleSystemUIFont"
}

const Button = ({ onClick, style, text }) => {
  return (
    <span 
      onClick={onClick} 
      style={{
        ...defaultStyle,
        ...style
      }}
    >
      {text}
    </span>
  );
};

export default Button;