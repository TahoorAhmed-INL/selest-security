import React from 'react';

import {View, Text, Image, ImageSourcePropType, StyleSheet} from 'react-native';

import {Colors, UI, fontSizes} from '../../styles/custom';
import {Logov2} from '../../assets/images';

export default function AuthOverlayHeader({text}: {text?: string}) {
  return (
    <>
      <View style={[UI.justifyCenter, UI.flexRow]}>
        <Image source={Logov2 as ImageSourcePropType} style={[styles.logo]} />
      </View>
      {text && (
        <Text
          style={[
            fontSizes.pri,
            UI.textCenter,
            {
              paddingHorizontal: 10,
              color: Colors.DarkBlue,
              marginBottom: 10,
            },
          ]}>
          {text}
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '60%',
    height: 150,
    resizeMode: 'contain',
  },
});
