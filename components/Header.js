import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../config/colors';

const Header = ({name}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Welcome to {name}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    widthe: '100%',
    height: 70,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    color: colors.primaryColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
});