import React from 'react'
import { Modal, View, Button, StyleSheet } from 'react-native'
import Label from '../components/Label';
import commonStyles from '../config/commonStyles';
import colors from '../config/colors'

const Confirm = ({ onGoBack, onContinue, userData }) => {
  return(
    <Modal transparent={true} animationType='slide'>
      <View style={styles.modalBackground}>
        <View style={commonStyles.card}>
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
    backgroundColor: colors.modalBackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
});