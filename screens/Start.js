import React, { useState } from 'react';
import { SafeAreaView, View, Button, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';
import Input from '../components/Input';
import Label from '../components/Label';
import commonStyles from '../config/commonStyles';
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
      isValid = false;
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
      isValid = false;
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
      isValid = false;
    } else if (inputedPhone.length !== 10) {
      setPhoneError('Phone number must be 10 digits');
      isValid = false;
    } else if (isNaN(inputedPhone)) {
      setPhoneError ('Phone number must contain only numbers');
      isValid = false;
    } else if (inputedPhone[inputedPhone.length - 1] === '0' ||
               inputedPhone[inputedPhone.length - 1] === '1') {
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={commonStyles.container}>
          <Label type='header'>Welcome to {appName}</Label>
          <View style={commonStyles.container}>
            <View style={commonStyles.card}>
              <Input
                label='Name'
                errorMsg={nameError}
                placeholder='Enter your name'
                value={name}
                onChangeText={validateName}/>

              <Input
                label='Email'
                errorMsg={emailError}
                placeholder={'Enter your email'}
                value={email}
                keyboardType='email-address'
                onChangeText={validateEmail}/>

              <Input
                label='Phone'
                errorMsg={phoneError}
                placeholder={'Enter your phone number'}
                value={phone}
                keyboardType='numeric'
                onChangeText={validatePhone}/>

              <View style={styles.checkBoxContainer}> 
                <CheckBox style={styles.checkBox}
                  value={isRobotChecked}
                  onValueChange={setIsRobotChecked}/>
                <Label type='checkboxLabel'>I am not a robot</Label>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Start;

const styles = StyleSheet.create({
  checkBoxContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    color: colors.primaryColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
