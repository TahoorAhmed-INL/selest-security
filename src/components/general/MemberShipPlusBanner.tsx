import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  useWindowDimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Colors, UI} from '../../styles/custom';
import {MemberShipBanner} from '../../assets/images';
import Button from '../ui/Button';

export default function MemberShipPlusBanner() {
  const {navigate} = useNavigation<any>();

  const {width} = useWindowDimensions();
  const textScaleFactor = width / 350;

  return (
    <View
      style={[
        UI.relative,
        {height: '20%', marginBottom: 6, maxHeight: 145, minHeight: 125},
        UI.justifyCenter,
      ]}>
      <View style={[UI.flexRow, styles.container]}>
        <View style={[UI.justifyBetween]}>
          <View>
            <Text
              style={{
                fontSize: textScaleFactor * 9,
                fontWeight: 'bold',
                color: Colors.DarkBlue,
              }}>
              GET OUR EXCLUSIVE SECURITY
            </Text>
            <Text
              style={{
                fontSize: textScaleFactor * 9,
                fontWeight: 'bold',
                color: '#fff',
                marginTop: 1,
              }}>
              PLUS MEMBERSHIP
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <Button
              isLoading={false}
              roundedFull
              textStyles={{fontSize: textScaleFactor * 9, letterSpacing: 0.4}}
              style={{paddingHorizontal: 12, paddingVertical: 9}}
              onPress={() => navigate('user-profile')}
              text="GET STARTED"
            />
          </View>
        </View>
      </View>
      <Image
        style={styles.image}
        source={MemberShipBanner as ImageSourcePropType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Brown,
    borderRadius: 16,
    height: '75%',
    padding: 11,
  },
  image: {
    width: 135,
    height: 115,
    position: 'absolute',
    right: 10,
  },
});
