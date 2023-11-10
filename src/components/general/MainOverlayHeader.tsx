import React from 'react';

import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import {Colors, UI, fontSizes} from '../../styles/custom';
import {LogoDark} from '../../assets/images';

export default function MainOverlayHeader({
  textTop,
  textBottom,
}: {
  textTop?: string;
  textBottom: string;
}) {
  const {height, width} = useWindowDimensions();
  const textScaleFactor = width / 350;

  return (
    <>
      <View style={[UI.justifyCenter, UI.flexRow, {marginTop: 30}]}>
        <Image
          source={LogoDark as ImageSourcePropType}
          style={[
            styles.logo,
            {
              width: width * 0.28,
              height: height * 0.21,
            },
          ]}
        />
      </View>
      {textTop && (
        <Text
          style={[
            fontSizes.pri,
            UI.textCenter,
            {
              paddingHorizontal: 10,
              color: Colors.DarkBlue,
              fontSize: 12 * textScaleFactor,
              fontWeight: 'bold',
              marginTop: 15,
            },
          ]}>
          {textTop}
        </Text>
      )}
      {textBottom && (
        <Text
          style={[
            fontSizes.pri,
            UI.textCenter,
            {
              paddingHorizontal: 10,
              color: Colors.Brown,
              fontSize: 12 * textScaleFactor,
              fontWeight: 'bold',
              marginTop: 2,
            },
          ]}>
          {textBottom}
        </Text>
      )}
      <View style={{alignItems: 'center', marginTop: 13, marginBottom: 30}}>
        <View
          style={{width: '60%', flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 0.5, height: 2, backgroundColor: Colors.Brown}} />
          <View
            style={{flex: 0.5, height: 2, backgroundColor: Colors.DarkBlue}}
          />
        </View>
      </View>
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
