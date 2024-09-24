import { StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../config/colors';
import GameLogic from '../logic/GameLogic';

const Game = ({ phoneNumber, onRestart }) => {

  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(60);
  coonst[attemptsLeft, setAttemptsLeft] = useState(4);
  const [inputValue, setInputValue] = useState('');
  const [hintUsed, setHintUsed] = useState(false);
  const [chosenNumber, setChosenNumber] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if(gameStarted && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if(timer === 0) {
      setGameOver(true);
      setFeedback('You are out of time!');
    }
  }, [gameStarted, timer]);

  useEffect(() => {
    // Pick the chosen number by parsing the last digit of the phone number
    if (phoneNumber) {
      const lastDigit = parseInt(phoneNumber[phoneNumber.length - 1], 10);
      setChosenNumber(GameLogic.generateNumber(lastDigit));
    }
  }, [phoneNumber]);

  const startGame = () => {
    setGameStarted(true);
    setFeedback('');
  }

  const handleGuess = () => {
    const guessedNumber = parseInt(inputValue, 10);
    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
      Alert.alert('Invalid input', 'Please enter a valid number between 1 and 100', [{ text: 'OK' }]);
      return;
    }

    const { correct, feedbackMessage, attemptsLeft } = GameLogic.checkGuess(
      guessedNumber, chosenNumber, attemptsLeft);
    
    setAttemptsLeft(attemptsLeft);
    setFeedback(feedbackMessage);

    if (correct) {
      setWon(true);
      setGameOver(true);
      setFeedback(feedbackMessage);
    } else {
      setFeedback(feedbackMessage);
      setAttemptsLeft(attemptsLeft);
      setInputValue('');
    }

    if (attemptsLeft === 0) {
      setGameOver(true);
      setFeedback('You are out of attempts!');
    }
  }
};


const styles = StyleSheet.create({})

export default Game;