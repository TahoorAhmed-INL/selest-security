import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {Colors, UI, fontSizes} from '../../styles/custom';

interface DrawerLinkItemProps {
  label: string;
  onPress: () => void;
  Icon: any;
  isActive?: boolean;
}

export default function DrawerLinkItem({
  label,
  onPress,
  Icon,
  isActive = false,
}: DrawerLinkItemProps) {
  // const brownColor = isActive ? Colors.Brown : Colors.DarkBlue;
  // const activeTextColor = isActive ? '#fff' : Colors.DarkGray;
  // const borderActive = isActive ? Colors.Brown : Colors.Gray;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        {backgroundColor: Colors.DarkBlue, borderColor: Colors.Brown},
      ]}>
      <View style={[UI.flexRow, UI.alignCenter, {gap: 7}]}>
        <View
          style={{
            padding: 4,
            borderRadius: 20,
          }}>
          {Icon && (
            <Icon size={18} color={isActive ? Colors.Brown : Colors.Brown} />
          )}
        </View>
        <Text style={[fontSizes.pri, {color: Colors.Brown}]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 26,
    borderTopWidth: 0.4,
    borderBottomWidth: 0.4,
    backgroundColor: Colors.DarkBlue,
  },
});
