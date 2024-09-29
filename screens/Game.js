import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button, Alert, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GameLogic from '../logic/GameLogic';
import Input from '../components/Input';
import colors from '../config/colors';

const Game = ({ chosenNumber, onRestart }) => {
  const [guess, setGuess] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [attempts, setAttempts] = useState(4);
  const [timer, setTimer] = useState(60);
  const [feedback, setFeedback] = useState('');
  const [won, setWon] = useState(false);

  // Timer logic
  useEffect(() => {
    if(gameStarted && timer > 0 && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setGameOver(true);
      setFeedback('You are out of time!');
    }
  }, [timer]);

  const handleStartGame = () => {
    setGameStarted(true);
    setFeedback('');
  };

  const handleGuess = () => {
    const guessedNumber = parseInt(guess, 10);
    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
      Alert.alert('Invalid input', 'Please enter a valid number between 1 and 100', [{ text: 'OK' }]);
      return;
    }

    const { correct, feedback, attempts } = GameLogic.checkGuess(
      guessedNumber, chosenNumber, attempts);
    
    setAttempts(attempts);
    setFeedback(feedback);

    if (correct) {
      setWon(true);
      setGameOver(true);
      setFeedback(feedback);
    } else {
      setFeedback(feedback);
      setAttempts(attempts);
      setGuess('');
    }

    if (attempts === 0) {
      setGameOver(true);
      setFeedback('You are out of attempts!');
    }
  };

  const handleHint = () => {
    if (!hintUsed) {
      setHintUsed(true);
      Alert.alert('Hint', `The number is a multiple of ${chosenNumber % 10}`);
    }
  };

  const handleGameOver = (reason) => {
    setGameOver(true);

    if (reason === 'time') {
      Alert.alert('Game Over', 'Time is up!');
    } else if (reason === 'attempts') {
      Alert.alert('Game Over', 'You are out of attempts!');
    }
  };

  const handleNewGame = () => {
    setGuess('');
    setGameStarted(false);
    setGameOver(false);
    setHintUsed(false);
    setAttempts(4);
    setTimer(60);
    setWon(false);

    onRestart(); // Notify parent to restart with new number
  };

  return (
    <SafeAreaView>
      {gameOver && won && (
        <View style={styles.modal}>
          <Text>You guessed correct!</Text>
          <Text>Attempts used: {4 - attempts}</Text>
          <Image
            source={{ uri: `https://picsum.photos/id/${chosenNumber}/100/100` }}
            style={{ width: 100, height: 100 }}
          />
          <Button title="New Game" onPress={handleNewGame} />
        </View>
      )}

      {gameOver && !won && (
        <View style={styles.modal}>
          <Text>The game is over!</Text>
          <Image source={require('../assets/sad-face.png')} style={{width: 100, height: 100}} />
          <Text>{timer === 0 ? 'You are out of time' : 'You are out of attempts'}</Text>
          <Button title="New Game" onPress={handleNewGame} />
        </View>
      )}

      {!gameStarted && !gameOver && (
        <View style={styles.modal}>
          <Text>Guess a number between 1 & 100 that is a multiple of the last digit of your phone number.</Text>
          <Button title="Start" onPress={handleStartGame} />
        </View>
      )}

      {gameStarted && !gameOver && (
        <View style={styles.modal}>
          <Input
            style={styles.input}
            placeholder="Enter your guess"
            value={guess}
            onChangeText={setGuess}
            keyboardType="numeric"
          />
          <Text>Attempts left: {attempts}</Text>
          <Text>Timer: {timer}s</Text>
          <Button title="Use a Hint" onPress={handleHint} disabled={hintUsed} />
          <Button title="Submit guess" onPress={handleGuess} />
        </View>
      )}

      <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
        <Text>Restart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
};


const styles = StyleSheet.create({})

export default Game;