import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState} from 'react'

const Input = ({placeholder, onChangeText, validation, errorMessage}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  
  const handleOnChangeText = (text) => {
    // Update the internal state of the input
    setInputValue(text);

    // Check if the input is valid
    if (validation) {
      if (validation(text)) {
        // No error
        setError('');
      } else {
        // Show error message
        setError(errorMessage);
      }
    }

    // Call the parent component's handler
    if (onChangeText) {
      onChangeText(text);
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleOnChangeText}
        placeholder={placeholder}
        keyboardType='default'/>
        
      {/* Show error message if any */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container:{
    marginVertical: 12,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'gainsboro',
    borderWidth: 1,
  },
  
  input: {
    height: 40,
    color: 'darkblue',
    borderBlockColor: 'darkblue',
    borderBottomWidth: 2,
    paddingLeft: 10,
  },

  error: {
    color: 'darkgrey',
    fontSize: 12,
    marginTop: 5,
  },
});