import React from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Colors, UI} from '../../styles/custom';
interface ActionWithIconProps {
  to: any;
  text: string;
  icon: React.ReactNode;
  style?: ViewStyle;
  textStyle?: any;
  params?: any;
  onPress?: false | (() => void);
}
const ActionWithIcon = ({
  to,
  icon,
  text,
  style,
  textStyle,
  params,
  onPress,
}: ActionWithIconProps) => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[UI.roundedFull, styles.container, UI.alignCenter]}
      onPress={() => {onPress ? onPress() : navigation.navigate(to, params ?? params);
      }}>
      <View
        style={[
          styles.pill,
          UI.flexRow,
          UI.justifyCenter,
          UI.alignCenter,
          {...style},
        ]}>
        {icon ? icon : null}
        <Text style={[styles.text, {...textStyle}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.Brown,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#e3e3e3',
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  pill: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 14,
  },
  text: {
    color: Colors.Brown,
    fontSize: 12,
    marginLeft: 8,
    fontWeight: 400,
  },
});

export default ActionWithIcon;
