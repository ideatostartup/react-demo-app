import React from "react";

const defaultStyle = {
  fontFamily: ".SFNSDisplay",
  fontSize: "20px",
  color: "#2A3842"
}

const SubTitle = ({ style, text }) => {
  return <span style={{ ...defaultStyle, ...style }}>{text}</span>;
};


export default SubTitle;