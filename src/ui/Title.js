import React from "react";

const defaultStyle = {
  fontFamily: ".SFNSDisplay",
  fontSize: 40,
  lineHeight: "55px",
  marginBottom: 20,
  color: "#2A3842"
}

const Title = ({ style, text }) => {
  return <span style={{ ...defaultStyle, ...style }}>{text}</span>;
};


export default Title;