import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState} from 'react'
import colors from '../config/colors';

const Input = (props) => {
  const {label, errorMsg, ...inputProps} = props;
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputProps}
        style={styles.input} />
      <Text style={styles.errorText}>{errorMsg}</Text>
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: colors.primaryColor,
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    height: 40,
    fontSize: 16,
    color: colors.primaryColor,
    borderBlockColor: colors.primaryColor,
    borderBottomWidth: 2,
    paddingLeft: 10,
  },
  errorText: {
    color: colors.errorTextColor,
    fontSize: 10,
    marginBottom: 10,
  },
});