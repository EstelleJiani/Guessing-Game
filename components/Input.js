import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import Label from './Label';
import colors from '../config/colors';

const Input = (props) => {
  const {label, errorMsg, ...inputProps} = props;
  return (
    <>
      <Label type='label'>{label}</Label>
      <TextInput
        {...inputProps}
        style={styles.input} />
      <Label type='errorText'>{errorMsg}</Label>
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    color: colors.primaryColor,
    borderBlockColor: colors.primaryColor,
    borderBottomWidth: 2,
    height: 40,
    minWidth: 140,
    textAlign: 'left',
  },
});