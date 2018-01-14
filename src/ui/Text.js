import React from "react";

const defaultStyle = {
  fontSize: 14
};

const Text = ({ style, text }) => {
  return <span style={{ ...defaultStyle, ...style }}>{text}</span>;
};


export default Text;