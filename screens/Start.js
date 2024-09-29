import { StyleSheet, Text, View, Alert, Button, SafeAreaView, Modal } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import Label from '../components/Label';
import CheckBox from 'expo-checkbox';
import colors from '../config/colors';

const Start = ({ onConfirm, appName }) => {
  // State variables to store user input
  const [name, setName] = useState('');
  const [email , setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isRobotChecked, setIsRobotChecked] = useState(false);

  // State variables to store error messages
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateName = (inputedName) => {
    setName(inputedName);

    let isValid = true;

    if (inputedName.length === 0) {
      setNameError('');
    } else if (inputedName.length <= 1) {
      setNameError('Names should be more than 1 character');
      isValid = false;
    } else if (/\d/.test(inputedName)) {
      setNameError('Names should not contain numbers');
      isValid = false;
    } else {
      setNameError('');
    }

    return isValid;
  };

  const validateEmail = (inputedEmail) => {
    setEmail(inputedEmail);

    let isValid = true;

    if (inputedEmail.length === 0) {
      setEmailError('');
    } else if (!inputedEmail.includes('@') || !inputedEmail.includes('.')) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    return isValid;
  };

  const validatePhone = (inputedPhone) => {
    setPhone(inputedPhone);

    let isValid = true;

    if (inputedPhone.length === 0) {
      setPhoneError('');
    } else if (inputedPhone.length !== 10) {
      setPhoneError('Phone number must be 10 digits');
      isValid = false;
    } else if (isNaN(inputedPhone)) {
      setPhoneError ('Phone number must contain only numbers');
      isValid = false;
    } else if (inputedPhone[inputedPhone.length - 1] === '0' || inputedPhone[inputedPhone.length - 1] === '1') {
      setPhoneError('The last digit cannot be 0 or 1');
      isValid = false;
    } else {
      setPhoneError('');
    }

    return isValid;
  };

  // Validation functions to check if the user input is valid
  const inputValidation = () => {
    let isValid = true;

    // Name, Email and Phone validation
    isValid = validateName(name) &&
              validateEmail(email) &&
              validatePhone(phone);

    return isValid;
  };

  // Function to handle the information submission
  const handleStart = () => {
    const isValid = inputValidation();

    if (isValid && isRobotChecked) {
      onConfirm({name, email, phone});
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
      <View style={styles.modalContainer}>
        <Label>Name</Label>
        <Input
          placeholder={'Enter your name'}
          value={name}
          onChangeText={validateName}/>
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <Label>Email</Label>
        <Input
          placeholder={'Enter your email'}
          value={email}
          onChangeText={validateEmail}/>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <Label>Phone</Label>
        <Input
          placeholder={'Enter your phone number'}
          value={phone}
          onChangeText={validatePhone}/>
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
            color={colors.redoButtonColor}
            onPress={handleReset}/>
          <Button
            title='Register'
            color={colors.confirmButtonColor}
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
  infomationContainer:{
    marginVertical: 12,
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.cardBackgroundColor,
    borderWidth: 1,
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


export default Start;