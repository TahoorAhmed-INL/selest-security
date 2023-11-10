import React from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Colors, UI, boxShadow} from '../../styles/custom';
interface ActionButtonProps {
  to: any;
  text: string;
  icon: React.ReactNode;
  style?: ViewStyle;
  textStyle?: any;
  params?: any;
  onPress?: false | (() => void);
}
const ActionButton = ({
  to,
  icon,
  text,
  style,
  textStyle,
  params,
  onPress,
}: ActionButtonProps) => {
  const navigation: any = useNavigation();
  const {width} = useWindowDimensions();
  const textScaleFactor = width / 350;

console.log(params)

  return (
    <TouchableOpacity
      activeOpacity={0.4}
      style={[styles.container, {...style}]}
      onPress={() => {
        onPress ? onPress() : navigation.navigate(to, params ?? params);
      }}>
      <View style={[styles.pill, UI.alignCenter]}>
        {icon ? icon : null}
        <Text
          style={[
            styles.text,
            UI.textCenter,
            {fontSize: textScaleFactor * 10, ...textStyle},
          ]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  pill: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  text: {
    color: Colors.DarkBlue,
    marginTop: 10,
    fontSize: 13,
  },
});

export default ActionButton;
