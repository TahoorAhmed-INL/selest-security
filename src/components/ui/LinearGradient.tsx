import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {UI, boxShadow} from '../../styles/custom';

interface GradientProps {
  children: ReactNode;
  shadow?: boolean;
}

const Gradient = ({children, shadow = true}: GradientProps) => {
  return (
    <LinearGradient
      colors={['#B48C32', '#d0bc8c']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={[
        styles.gradient,
        UI.roundedFull,
        shadow && {
          ...boxShadow.pri,
          ...styles.shadowed,
        },
      ]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 24,
  },
  shadowed: {
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
});

export default Gradient;
