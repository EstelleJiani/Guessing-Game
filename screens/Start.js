import { StyleSheet, Text, View, Alert, Button, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import Label from '../components/Label';
import CheckBox from '@react-native-community/checkbox';
import colors from '../config/colors';

const StartScreen = ({ onStartGame, appName }) => {
  // State variables to store user input
  const [name, setName] = useState('');
  const [email , setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isRobotChecked, setIsRobotChecked] = useState(false);

  // State variables to store error messages
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Validation functions to check if the user input is valid
  const inputValidation = () => {
    let isValid = true;

    // Name validation
    if (name.length <= 1 ) {
      setNameError('Names should be more than 1 character');
      isValid = false;
    } else if (/\d/.name(text)) {
      setNameError('Names should not contain numbers');
      isValid = false;
    } else {
      setNameError('');
    }

    // Email validation
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Phone validation
    if (phone.length !== 10) {
      setPhoneError('Phone number must be 10 digits');
      isValid = false;
    } else if (isNaN(phone)) {
      setPhoneError ('Phone number must contain only numbers');
      isValid = false;
    } else if (phone[phone.length - 1] === '0' || phone[phone.length - 1] === '1') {
      setPhoneError('The last digit cannot be 0 or 1');
      isValid = false;
    } else {
      setPhoneError('');
    }

    return isValid;
  };

  // Function to handle the information submission
  const handleStart = () => {
    const isValid = inputValidation();

    if (isValid && isRobotChecked) {
      onStartGame({name, email, phone});
    } else {
      Alert.alert('Invalid Input', 'Check the input values', [{ text: 'OK' }]);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setIsRobotChecked(false);
    setNameError('');
    setEmailError('');
    setPhoneError('');
  }

  // Helper variable to check if the form is complete
  // for the register button to be enabled
  const isFormComplete = name && email && phone && isRobotChecked;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <Header name={appName}/>
      </View>
      <View>
        <Label>Name</Label>
        <Input
          placeholder={'Enter your name'}
          value={name}
          onChangeText={setName}/>
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <Label>Email</Label>
        <Input
          placeholder={'Enter your email'}
          value={email}
          onChangeText={setEmail}/>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <Label>Phone</Label>
        <Input
          placeholder={'Enter your phone number'}
          value={phone}
          onChangeText={setPhone}/>
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

        <View style={styles.checkBoxContainer}> 
          <CheckBox style={styles.checkBox}
            value={isRobotChecked}
            onValueChange={setIsRobotChecked}/>
          <Label>I am not a robot</Label>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title='Reset'
            onPress={handleReset}/>
          <Button
            title='Register'
            onPress={handleStart}
            disabled={!isFormComplete}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.backgroundColor,
  },
  topView: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    flex: 6,
    alignContent: 'center',
    justifyContent: 'center',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkBox: {
    color: colors.primaryColor,
    marginLeft: 10,
  },
  errorText: {
    color: colors.errorTextColor,
    fontSize: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});


export default StartScreen;