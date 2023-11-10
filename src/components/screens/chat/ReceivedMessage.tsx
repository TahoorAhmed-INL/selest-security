import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  ImageSourcePropType,
} from 'react-native';

import {Colors} from '../../../styles/custom';

import {IncomingMessageTail} from '../../../assets/images';
import { extractTime } from '../../../lib/helpers';

const ReceivedMessage = ({message}: {message: Record<any, any>}) => {
  const {width} = useWindowDimensions();
  const textScaleFactor = width / 350;

  return (
    <View style={styles.receivedMessage}>
      <Text
        style={[styles.receivedMessageText, {fontSize: 10 * textScaleFactor,color:Colors?.Brown,paddingBottom:3}]}>
        {message?.sender?.name}
      </Text>
      <Text
        style={[styles.receivedMessageText, {fontSize: 11 * textScaleFactor}]}>
        {message?.message}
      </Text>
      <Text
        style={[
          styles.time,
          styles.receivedMessageText,
          {fontSize: 7 * textScaleFactor, alignSelf: 'flex-end'},
        ]}>
        {extractTime(message?.createdAt)}
      </Text>
      <Image
        source={IncomingMessageTail as ImageSourcePropType}
        style={styles.tail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  receivedMessage: {
    marginTop: 2,
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: Colors.DarkBlue,
    marginLeft: 24,
    maxWidth: '70%',
  },
  receivedMessageText: {
    color: '#fff',
  },
  time: {
    alignSelf: 'flex-start',
    paddingLeft: 2,
  },
  tail: {
    position: 'absolute',
    left: -12,
    bottom: 7,
    width: 15,
    height: 14,
  },
});

export default ReceivedMessage;
