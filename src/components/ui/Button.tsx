import React, {FC} from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  TextStyle,
} from 'react-native';

import {Colors} from '../../styles/custom';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  roundedFull?: boolean;
  gradient?: boolean;
  isLoading?: boolean;
  textStyles?: TextStyle;
}

const Button: FC<ButtonProps> = ({
  text,
  onPress,
  style,
  isLoading,
  textStyles,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, {...style}]}
      onPress={onPress}
      disabled={isLoading}
      >
      <Text style={[styles.buttonText, {...textStyles,opacity:isLoading ? .5: 1}]}>
        {text} 
      </Text>
        {isLoading && <ActivityIndicator color="#fff" size={12} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 14,
    paddingHorizontal: 70,
    justifyContent: 'center',
    backgroundColor: Colors.DarkBlue,
    margin: 0,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    borderRadius: 11,
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
  },
});
export default Button;
