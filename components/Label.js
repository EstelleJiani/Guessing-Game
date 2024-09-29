import React from 'react'
import { Text, StyleSheet } from 'react-native'
import colors from '../config/colors'

const Label = ({children}) => {
  return (
    <Text style={styles.label}>{children}</Text>
  );
};

export default Label;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: colors.primaryColor,
    marginLeft: 10,
    marginBottom: 5,
    textAlign: 'left',
  },
})