// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState }from 'react';
import Start from './screens/Start';
// import Confirm from './screens/Confirm';
// import Game from './screens/Game';
import colors from './config/colors';


const App = () => {
  // set the current screen to 'start' by default
  const [currentScreen, setCurrentScreen] = useState('start');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Function to navigate from the start screen to the confirm screen
  const handleConfirm = (data) => {
    // Store the user data in the state from the start screen
    setUserData(data);
    setCurrentScreen('confirm');
  }

  // Function to navigate from the confirm screen to the game screen
  const handleGameStart = () => {
    setCurrentScreen('game');
  }

  // Function to navigate from confirm screen back to the start screen
  const handleEdit = () => {
    setCurrentScreen('start');
  }

  return (
    <LinearGradient
      colors = {
        [colors.backgroundGradientStart, colors.backgroundGradientEnd]}
        start = {{x: 0, y: 0}}
        end = {{x: 0, y: 1}}
        style = {styles.container}>
      <View>
        {currentScreen === 'start' && <Start onConfirm={handleConfirm} appName="Guessing Game" />}
        {/* {currentScreen === 'confirm' && <Confirm userData={userData} onStartGame={handleGameStart} onEdit={handleEdit} />}
        {currentScreen === 'game' && <Game />} */}
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;