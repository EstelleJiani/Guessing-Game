import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
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
    color: 'darkblue',
    fontSize: 18,
    fontWeight: 'bold',
  },
});