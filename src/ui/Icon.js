import React from "react";

const defaultStyle = {
  margin: 10,
  cursor: "pointer",
}

const Icon = ({ src, style, onClick }) => {
  return (
    <img
      style={{
        ...defaultStyle,
        ...style
      }}
      onClick={onClick}
      src={src}
      alt={src}
    />
  );
};

export default Icon;