import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

const Button = ({title, onPress, loading = false, disabled = false, buttonStyle}) => {
  return (
    // TouchableOpacity helps to indicate if the button is clickable
    <TouchableOpacity
      // Call the onPress handler when the button is pressed
      onPress={onPress}
      // Apply the styles passed from the parent component
      style={[styles.button, buttonStyle, disabled ? styles.disabled : null]}
      // The button is disabled if the disabled prop is true or the loading prop is true
      disabled={disabled || loading}>
      
      {
        // Show a loading indicator if loading is true
        loading ? (<ActivityIndicator/>) :
        // Show the title if the loading is false
        <Text style={styles.buttonText}>{title}</Text>
      }
    </TouchableOpacity>
  )
}

export default Button;

const styles = StyleSheet.create({
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '120',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  disabled: {
    backgroundColor: 'gainsboro',
  },
  confirmButton: {
    backgroundColor: 'royalblue',
  },
  redoButton: {
    backgroundColor: 'salmon',
  },
  restartButton: {
    backgroundColor: 'cornflowerblue',
  },
});