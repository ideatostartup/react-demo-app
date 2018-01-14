import React from "react";

const defaultStyle = {
  width: "100%",
  border: "1px solid rgba(255,255,255,0.20)",
}

const Divider = ({ style }) => {
  return (
    <hr
      style={{
        ...defaultStyle,
        ...style
      }}
    />
  );
};

export default Divider;