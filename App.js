import React, { useState }from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Start from './screens/Start';
import Confirm from './screens/Confirm';
import Game from './screens/Game';
import colors from './config/colors';

const App = () => {
  // set the current screen to 'start' by default
  const [currentScreen, setCurrentScreen] = useState('start');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [chosenNumber, setChosenNumber] = useState(null);

  // Function to navigate from the start screen to the confirm screen
  const handleConfirm = (data) => {
    // Store the user data in the state from the start screen
    setUserData(data);
    setCurrentScreen('confirm');
  }

  // Function to navigate from the confirm screen to the game screen
  const handleGameStart = () => {
    const lastDigit = parseInt(userData.phone[userData.phone.length - 1], 10);
    setChosenNumber(GameLogic.generateNumber(lastDigit));
    setCurrentScreen('game');
  }

  // Function to navigate from confirm screen back to the start screen
  const handleEdit = () => {
    setCurrentScreen('start');
  }

  return (
    <LinearGradient
      colors={
        [colors.backgroundGradientStart, colors.backgroundGradientEnd]}
      style={styles.background}>
      <View style={styles.container}>
        <Start onConfirm={handleConfirm} appName="Guessing Game" />
        {currentScreen === 'confirm' && (
          <Confirm userData={userData}
                   onContinue={handleGameStart}
                   onGoBack={handleEdit} />
        )}
        {currentScreen === 'game' && (
          <Game chosenNumber={chosenNumber} onRestart={handleEdit} />
        )}
      </View>
    </LinearGradient>
  )
}

export default App;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});