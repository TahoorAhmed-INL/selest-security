import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import { GuardImage } from '../../assets/images';

const ShieldAvatar = ({source}) => {
  return (
    <View style={styles.shield}>
      <View style={styles.triangle} />
      <Image source={GuardImage} style={styles.avatarImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  shield: {
    width: 100, // Adjust the size of the shield container as needed
    height: 100,
    backgroundColor: 'blue', // Shield background color
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 25, // Adjust the width of the triangle to shape the shield
    borderRightWidth: 25, // Adjust the width of the triangle to shape the shield
    borderBottomWidth: 50, // Adjust the height of the triangle to shape the shield
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'blue', // Triangle color should match the shield background color
    position: 'absolute',
    top: 0,
    left: 0,
  },
  avatarImage: {
    width: 90, // Adjust the size of the image as needed
    height: 90,
    borderRadius: 45, // Makes it a circle; adjust as needed
    resizeMode: 'cover',
    zIndex: 1, // Ensure the image is on top of the triangle
  },
});

export default ShieldAvatar;
