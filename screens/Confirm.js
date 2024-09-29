import React from 'react'
import { Modal, View, Button, StyleSheet } from 'react-native'
import Label from '../components/Label';
import colors from '../config/colors'

const Confirm = ({ onGoBack, onContinue, userData }) => {
  return(
    <Modal transparent={true} animationType='slide'>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Label>Hello {userData.name}</Label>
          <Label>Here is the information you entered:</Label>
          <Label>Email: {userData.email}</Label>
          <Label>Phone: {userData.phone}</Label>
          <Label>If it is not correct, please go back and edit them.</Label>

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
      </View>
    </Modal>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    backgroundColor: colors.cardBackgroundColor,
    borderRadius: 10,
    padding: 20,
    shadowColor: colors.cardShadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },

  // tansparentGradient: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: colors.transparentBackground,
  // },
});