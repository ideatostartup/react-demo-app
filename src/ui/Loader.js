import React from "react";
import styles from '../styles';
import { Text } from '../ui'

const Loader = () => (
  <div 
    style={{
      ...styles.app,
      ...styles.screen
    }}
  >
    <Text text="Loading ..."/>
  </div> 
)

export default Loader;

