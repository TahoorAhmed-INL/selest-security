import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  ImageSourcePropType,
} from 'react-native';

import { Colors } from '../../../styles/custom';

import { OutGoingMessageTail } from '../../../assets/images';
import { extractTime } from '../../../lib/helpers';

const OutgoingMessage = ({ message }: { message: Record<any, any> }) => {
  const { width } = useWindowDimensions();
  const textScaleFactor = width / 350;

  return (
    <View style={styles.outgoingMessage}>
      <Text
        style={[styles.outgoingMessageText, { fontSize: 11 * textScaleFactor }]}>
        {message?.message}
      </Text>
      <Text
        style={[
          styles.time,
          styles.outgoingMessageText,
          { fontSize: 7 * textScaleFactor },
        ]}>
        {extractTime(message?.createdAt)}
      </Text>
      <Image
        source={OutGoingMessageTail as ImageSourcePropType}
        style={styles.tail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outgoingMessage: {
    marginTop: 2,
    alignSelf: 'flex-end',
    backgroundColor: Colors.Brown,
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
    marginRight: 24,
    maxWidth: '70%',
  },
  outgoingMessageText: {
    color: 'white',
  },
  time: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  tail: {
    position: 'absolute',
    right: -12,
    bottom: 7,
    width: 15,
    height: 14,
  },
});

export default OutgoingMessage;
