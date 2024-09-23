import { StyleSheet, Text, View, Button, Modal } from 'react-native'
import React from 'react'
import colors from '../config/colors'
import { LinearGradient } from 'expo-linear-gradient'

const Confirm = ({ isVisible, onGoBack, onContinue, userInfo }) => {
  return(
    <Modal visible={isVisible} animationType='fade' transparent>
      <LinearGradient
        colors={[colors.backgroundGradientStart, colors.backgroundGradientEnd]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.modalOverlay}>
          <View style={styles.card}>
            <Text style={styles.infoText}>Hello {userInfo.name}</Text>
            <Text style={styles.infoText}>Here is the information you entered:</Text>
            <Text style={styles.infoText}>Email: {userInfo.email}</Text>
            <Text style={styles.infoText}>Phone: {userInfo.phone}</Text>
            <Text style={styles.infoText}>If it is not correct, please go back and edit them.</Text>

            <View style={styles.buttonContainer}>
              <Button 
                title='Go back'
                color={colors.redoButtonColor}
                onPress={onGoBack}/>
              <Button 
                title='Continue'
                color={colors.confirmButtonColor}
                onPress={onContinue}/>
            </View>
          </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  card: {
    backgroundColor: colors.cardBackgroundColor,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  infoText: {
    color: colors.primaryColor,
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
});

export default Confirm;