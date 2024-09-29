import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState} from 'react'
import colors from '../config/colors';

const Input = (props) => {
  return (
    <TextInput
      style={[styles.input, props.style]}
      {...props} />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 16,
    color: colors.primaryColor,
    borderBlockColor: colors.primaryColor,
    borderBottomWidth: 2,
    paddingLeft: 10,
  },
});