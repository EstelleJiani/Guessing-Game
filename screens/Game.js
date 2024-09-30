import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Button, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import GameLogic from '../logic/GameLogic';
import Input from '../components/Input';
import Label from '../components/Label';
import commonStyles from '../config/commonStyles';
import colors from '../config/colors';

const Game = ({ lastDigit, onRestart }) => {
  const [chosenNumber, setChosenNumber] = useState(null);
  const [currentPage, setCurrentPage] = useState('rules');
  const [guess, setGuess] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [hint, setHint] = useState('');
  const [attempts, setAttempts] = useState(4);
  const [timer, setTimer] = useState(60);
  const [feedback, setFeedback] = useState('');

  // Timer logic
  useEffect(() => {
    if(gameStarted && timer > 0 && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !gameOver) {
      setGameOver(true);
      setFeedback('You are out of time!');
      setCurrentPage('gameOver');
    }
  }, [gameStarted, gameOver, timer]);

  const renderPageContent = () => {
    switch (currentPage) {
      case 'rules':
        return (
          <>
            <Label type='label'>
              Guess a number between 1 & 100 that is multiply of {lastDigit}.
              {"\n"}You have 60 seconds and 4 attempts.
            </Label>
            <Button title="Start" onPress={handleStartGame} />
          </>
        );
      case 'game':
        return (
          <>
            <Label>Guess a number between 1 & 100 that is multiply of {lastDigit}</Label>
            <Input
              style={styles.input}
              placeholder="Enter your guess"
              value={guess}
              onChangeText={setGuess}
              keyboardType="numeric"
            />
            <Label type='hint'>{hint}</Label>
            <Label type='tips'>Attempts left: {attempts}</Label>
            <Label type='tips'>Timer: {timer}s</Label>
            <Button title="Use a Hint" onPress={handleHint} disabled={hintUsed} />
            <Button title="Submit guess" onPress={handleGuess} />
          </>
        );
      case 'correctGuess':
        return (
          <>
            <Label>{feedback}</Label>
            <Label>Attempts used: {4 - attempts}</Label>
            <Image
              source={{ uri: `https://picsum.photos/id/${chosenNumber}/100/100` }}
              style={{ width: 100, height: 100 }}
            />
            <Button title="New Game" onPress={handleNewGame} />
          </>
        );
      case 'incorrectGuess':
        return (
          <>
            <Label>{feedback}</Label>
            <Button title="Try Again" onPress={handleTryAgain} />
            <Button title="End the game" onPress={handleEndTheGame} />
          </>
        );
      case 'gameOver':
        return (
          <>
            <Label>The game is over!</Label>
            <Image source={require('../assets/sad-face.png')} style={{width: 100, height: 100}} />
            <Label>{feedback}</Label>
            <Button title="New Game" onPress={handleNewGame} />
          </>
        );
      default:
        return null;
    }
  };

  const handleStartGame = () => {
    setChosenNumber(GameLogic.generateNumber(lastDigit));
    setGameStarted(true);
    setFeedback('');
    setCurrentPage('game');
  };

  const handleGuess = () => {
    const guessedNumber = parseInt(guess, 10);
    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
      Alert.alert('Invalid input', 'Please enter a valid number between 1 and 100', [{ text: 'OK' }]);
      return;
    } else if (guessedNumber % lastDigit !== 0) {
      Alert.alert('Invalid number!', `Number has to be a multiply of ${lastDigit} between 1 and 100.`, [{ text: 'Okay' }]);
      return;
    }

    const { correct, feedback, attemptsLeft } = GameLogic.checkGuess(
      guessedNumber, chosenNumber, attempts);
    
    setAttempts(attemptsLeft);
    setFeedback(feedback);

    if (correct) {
      setWon(true);
      setGameOver(true);
      setCurrentPage('correctGuess');
    } else {
      setGuess('');
      setCurrentPage('incorrectGuess');
    }
  };

  const handleHint = () => {
    if (!hintUsed) {
      setHintUsed(true);
      setHint(GameLogic.generateHint(chosenNumber));
    }
  };

  const handleTryAgain = () => {
    setGuess('');
    setFeedback('');

    if (attempts === 0) {
      setGameOver(true);
      setFeedback('You are out of attempts!');
      setCurrentPage('gameOver');
    } else {
      setCurrentPage('game');
    }
  }

  const handleEndTheGame = () => {
    setGameOver(true);
    setCurrentPage('gameOver');
  };

  const handleNewGame = () => {
    setGuess('');
    setGameOver(false);
    setWon(false);
    setHintUsed(false);
    setHint('');
    setAttempts(4);
    setTimer(60);

    handleStartGame();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <ScrollView contentContainerStyle={commonStyles.container}>
          <View style={commonStyles.card}>
            <View style={{ alignItems: 'center' }}>
              {renderPageContent()}
            </View>
            <View style={styles.restartButton}>
              <Button title='Restart' onPress={onRestart} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
};

export default Game;

const styles = StyleSheet.create({
  restartButton: {
    position: 'absolute',
    top: -40,
    right: 0,
  },
})
