import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState }from 'react';
import Start from '../screens/Start';
import Confirm from '../screens/Confirm';
import Game from '../screens/Game';


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
    <>
    {currentScreen === 'start' && <Start onConfirm={handleConfirm} appName="Guessing Game" />}
    {currentScreen === 'confirm' && <Confirm userData={userData} onStartGame={handleGameStart} onEdit={handleEdit} />}
    {currentScreen === 'game' && <Game />}
    </>
  )
}

export default App;