import React from "react";
import { Button, Link, Text, Title } from '../ui'

const defaultStyle = {
  form: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 485
  },
  formFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: 30
  },
}

const Form = ({
  error,
  title,
  inputs,
  footerButtonText,
  footerLinkText,
  footerSecondaryText,
  onFooterButtonClick,
  onFooterLinkClick
}) => {
  return (
    <div style={defaultStyle.form}>
      <Title text={title} />
      {inputs}
      {error ?
          <div
            style={{
              margin: 10
            }}
          >
            <Text 
              text={error}
              style={{
                color: "red",
              }}  
            />
          </div> 
      : null}
      <div style={defaultStyle.formFooter}>
        <Button text={footerButtonText} onClick={onFooterButtonClick} />
        <div
          style={{
            paddingLeft: 20
          }}
        >
          <Text text={footerSecondaryText} />
          <Link onClick={onFooterLinkClick} text={footerLinkText} />
        </div>
      </div>
    </div>
  );
};


export default Form;