import React from "react";

const defaultStyle = {
  wrapper: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  }
}

const Select = ({ placeholder, onChange, defaultValue, wrapperStyle }) => {
  return (
    <div 
      style={{
        ...defaultStyle.wrapper,
        ...wrapperStyle
      }}
    >
      <select
        style={{
          height: 30
        }}
        defaultValue={defaultValue || 10}
        onChange={onChange}
        placeholder={placeholder}
      >
        {Array(10)
          .fill()
          .map((e, k) => (
            <option key={k} value={k + 1}>
              {k + 1}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;