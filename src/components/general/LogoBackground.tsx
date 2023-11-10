import React from 'react';

import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import {LogoBG} from '../../assets/images';

export default function LogoBackground() {
  return (
    <Image
      source={LogoBG as ImageSourcePropType}
      style={[styles.backgroundImage]}
    />
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: -1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '25%',
    left: '0%',
    right: 0,
    bottom: 0,
    transform: [{translateY: -90}, {translateX: -80}],
  },
});
