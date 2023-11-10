import React from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  useWindowDimensions,
  Image,
  ImageSourcePropType,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Colors, UI, boxShadow} from '../../styles/custom';
import {Badge, LogoDark} from '../../assets/images';
interface OrderItemProps {
  currentOrder?: boolean;
  title: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: any;
  completed?: boolean;
  cancelled?: boolean;
  params?: any;
  nextPage?: any;
  id?: string | number;
  userId:number
}
const BorderedCardWithText = ({
  nextPage,
  icon,
  title,
  completed,
  cancelled,
  style,
  currentOrder,
  textStyle,
  id,
  userId
}: OrderItemProps) => {
  const navigation: any = useNavigation();
  const {width} = useWindowDimensions();
  const textScaleFactor = width / 350;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        UI.alignCenter,
        boxShadow.sec,
        UI.relative,
        {...style},
      ]}
      onPress={() => {
        console.log(nextPage && nextPage.path && nextPage.params);
        if (nextPage && nextPage.path && nextPage.params) {
          navigation.navigate(nextPage.path, {
            ...nextPage.params,
          });
        } else {
          navigation.navigate('order-detail', {
            orderId: id,
            orderName: title,
            userId:userId,
            completed: completed ?? false,
            cancelled: cancelled ?? false,
          });
        }
      }}>
      {currentOrder ? (
        <View style={styles.icon}>
          <Image style={styles.icon} source={LogoDark as ImageSourcePropType} />
        </View>
      ) : icon ? (
        icon
      ) : null}
      <Text
        style={[
          styles.text,
          UI.textCenter,
          {fontSize: textScaleFactor * 9, ...textStyle},
        ]}>
        {title}
      </Text>
      {currentOrder && (
        <Image source={Badge as ImageSourcePropType} style={[styles.badge]} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 80,
    backgroundColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    flex: 1,
    borderRadius: 10,
    padding: 14,
    borderColor: Colors.Brown,
  },
  text: {
    color: Colors.DarkBlue,
    marginTop: 5,
    fontSize: 13,
  },
  icon: {
    maxWidth: 36,
    maxHeight: 43,
  },
  badge: {
    position: 'absolute',
    top: -1,
    height: 25,
    width: 25,
    right: 5,
    transform: [
      {
        translateY: -3,
      },
    ],
  },
});

export default BorderedCardWithText;
