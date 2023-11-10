import React from 'react';

import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors, fontSizes} from '../../styles/custom';

export default function DestinationAction() {
  return (
    <View style={[styles.container]}>
      <View style={styles.arrivedContainer}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>
          You have arrived
        </Text>
        <Text style={[styles.text, fontSizes.pri, {marginVertical: 8}]}>
          S alvarado St.
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={[styles.text, fontSizes.pri]}>Start Job</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    paddingHorizontal: '10%',
  },
  button: {
    backgroundColor: Colors.Brown,
    width: '100%',
    paddingVertical: 12,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  arrivedContainer: {
    backgroundColor: '#0113b8',
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingVertical: 12,
  },
  text: {color: '#fff', textAlign: 'center'},
});
