import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import colors from '../config/colors'

const Label = (props) => {
  const {children, type, ...labelProps} = props;

  const getViewStyle = () => {
    switch (type) {
      case 'header':
        return styles.headerView;
      case 'checkboxLabel':
        return styles.leftAligned;
      case 'errorText':
        return styles.errorTextView;
      case 'tips':
        return styles.tips;
      default:
        return styles.default;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'header':
        return styles.header;
      case 'label':
        return styles.label;
      case 'checkboxLabel':
        return styles.checkboxLabel;
      case 'errorText':
        return styles.errorText;
      case 'hint':
        return styles.hint;
      case 'tips':
        return styles.tips;
      default:
        return styles.text;
    }
  };

  return (
    <View style={getViewStyle()}>
      <Text {...labelProps}
            style={getTextStyle()}>
        {children}
      </Text>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  default: {
  },
  headerView: {
    position: 'absolute',
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftAligned: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  errorTextView: {
    paddingBottom: 20,
  },

  text: {
    fontSize: 16,
    color: colors.primaryColor,
    paddingLeft: 10,
    paddingBottom: 10,
    textAlign: 'left',
  },
  header: {
    fontSize: 18,
    color: colors.primaryColor,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: colors.primaryColor,
  },
  checkboxLabel: {
    fontSize: 16,
    color: colors.primaryColor,
    paddingLeft: 10,
  },
  errorText: {
    fontSize: 12,
    color: colors.errorTextColor,
  },
  hint: {
    fontSize: 16,
    color: colors.hintTextColor,
  },
  tips: {
    fontSize: 14,
    color: colors.errorTextColor,
  },
})