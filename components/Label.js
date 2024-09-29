import { StyleSheet, Text } from 'react-native'
import React, { Children } from 'react'
import colors from '../config/colors'

const Label = ({children, style}) => {
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
  },
})