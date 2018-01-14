import React from "react";
import { Link, Text, SubTitle } from '../ui'

const defaultStyle = {
  modal: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  modalBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    background: "#FFFFFF",
    boxShadow: "0 0 20px 0 rgba(0,0,0,0.30)",
    borderRadius: 3
  }
}

const Modal = ({ onCancel, onConfirm }) => {
  return (
    <div style={defaultStyle.modal}>
      <div style={defaultStyle.modalBody}>
        <SubTitle
          text="Are you sure?"
          style={{
            margin: 20
          }}
        />
        <Text text="This idea will be permanently deleted." />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "stretch",
            justifyContent: "space-between",
            padding: 30,
            paddingBottom: 0
          }}
        >
          <Link style={{ color: "#333" }} text="CANCEL" onClick={onCancel} />
          <Link text="OK" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Modal;