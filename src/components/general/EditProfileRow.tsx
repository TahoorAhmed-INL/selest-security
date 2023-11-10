import React, {ReactNode} from 'react';

import {View, Text, StyleSheet} from 'react-native';

import {Colors, UI} from '../../styles/custom';

export default function EditProfileRow({
  label,
  children,
  textScaleFactor,
}: {
  label: string;
  children: ReactNode;
  textScaleFactor: number;
}) {
  return (
    <View
      style={[
        UI.wFull,
        UI.flexRow,
        UI.alignCenter,
        // UI.justifyCenter,
        // UI.alignCenter,
        {marginTop: 12},
      ]}>
      <View
        style={[styles.labelContainer, {flex: 0.35, alignSelf: 'flex-start'}]}>
        <Text
          style={[
            styles.color,
            {
              fontSize: 12 * textScaleFactor,
            },
          ]}>
          {label}
        </Text>
      </View>
      <View style={styles.valueContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  color: {
    color: Colors.DarkBlue,
  },
  labelContainer: {
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    paddingLeft: 14,
    borderWidth: 1,
    borderRightWidth: 0,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor:"#fff",
    // borderColor: Colors.Brown,
    // height: '100%',
  },
  valueContainer: {
    flex: 0.65,
  },
});
