import React, {Dispatch, SetStateAction} from 'react';

import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

import {Navigation2} from 'lucide-react-native';

import {Colors, UI, boxShadow} from '../../styles/custom';

interface MapControlsProps {
  setIsStarted: Dispatch<SetStateAction<boolean>>;
  isStarted: boolean;
}

export default function MapControls({
  setIsStarted,
  isStarted,
}: MapControlsProps) {
  const {width} = useWindowDimensions();
  const textScaleFactor = width / 350;

  return (
    <View style={[styles.container, boxShadow.sec]}>
      <View style={[UI.flexRow, UI.alignCenter]}>
        <Text style={[styles.highlight, {fontSize: textScaleFactor * 13}]}>
          16 min
        </Text>
        <Text style={[styles.distanceText, {fontSize: textScaleFactor * 13}]}>
          (6.8 km)
        </Text>
      </View>
      <Text
        style={{
          fontSize: textScaleFactor * 9,
          color: Colors.GrayV2,
          marginTop: 1,
        }}>
        Best route now due to traffic conditions
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          UI.flexRow,
          UI.justifyCenter,
          UI.alignCenter,
          {gap: 2, backgroundColor: isStarted ? '#0113b8' : '#fff'},
        ]}
        onPress={() => setIsStarted((prev: boolean) => !prev)}
        activeOpacity={0.6}>
        <Navigation2 color={isStarted ? '#fff' : '#707ad7'} size={13} />
        <Text
          style={[
            {
              fontSize: textScaleFactor * 10,
              color: isStarted ? '#fff' : '#707ad7',
            },
          ]}>
          Start
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: '3%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingLeft: '13%',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#009f10',
  },
  distanceText: {
    marginLeft: 3,
    fontWeight: 'bold',
    color: Colors.GrayV2,
  },
  button: {
    borderWidth: 0.4,
    borderColor: '#5767fa',
    borderRadius: 500,
    paddingHorizontal: '5%',
    paddingVertical: '2.3%',
    maxWidth: '24%',
    marginTop: 14,
  },
});
