import React from "react";

const defaultStyle = {
  padding: 5,
  fontSize: 16,
  cursor: "pointer",
  color: "#00A843"
}

const Link = ({ onClick, style, text }) => {
  return (
    <span 
      style={{ 
        ...defaultStyle, 
        ...style 
      }} 
      onClick={onClick}
    >
      {text}
    </span>
  );
};

export default Link;