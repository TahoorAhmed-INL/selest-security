import React, { useEffect } from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
  BackHandler,
} from 'react-native';

import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { AlignLeft, MoveLeft } from 'lucide-react-native';

import { UI } from '../../styles/custom';

import { ArrowLeft } from '../../assets/images';
import socketManager from '../../lib/socketManager';
import { useAppContext } from '../../store/AppContext';

interface HeaderProps {
  openDrawer?: () => void;
  title: string | undefined;
}
interface Params {
  orderId: string;
  orderName: string;
  completed?: boolean;
  accepted?: boolean;
  cancelled?: boolean;
}
const Header = ({ openDrawer, title }: HeaderProps) => {
  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();
  const { goBack } = useNavigation();
  const route = useRoute();
  const { state } = useAppContext();
  const { token } = state;

  const leaveChatRoomHandle = () => {
    if (route.name == "chat") {
      socketManager.emit("leaveRoom", { token: token, jobId: params?.orderId })
      console.log("socket ")
      return true;
    }
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', leaveChatRoomHandle)
    return () => {
      backHandler.remove()
    }
  }, [])
  console.log(route.name, "asd")
  return (
    <View style={[styles.container, UI.justifyCenter]}>
      <View style={[UI.flexRow, UI.justifyCenter, UI.relative]}>
        {openDrawer ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={openDrawer}
            style={styles.icon}>
            <AlignLeft size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              goBack(); // Call the goBack function
              leaveChatRoomHandle(); // Call the leaveChatRoomHandle function
            }}
            style={styles.icon}>
            {/* <MoveLeft size={24} color="#fff" /> */}
            <Image
              source={ArrowLeft as ImageSourcePropType}
              style={{ maxWidth: 27, height: 16.8 }}
            />
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: '#fff',
            fontWeight: '700',
            fontSize: 12,
            textAlign: 'center',
          }}>
          {title}
        </Text>
        {/* <View style={{flex: 4 / 12}} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#000027',
    // borderBottomLeftRadius: 35,
    // borderBottomRightRadius: 35,
    paddingHorizontal: 22,
  },
  icon: {
    position: 'absolute',
    left: 7,
    bottom: 1,
    transform: [
      {
        scale: 0.8,
      },
    ],
  },
});

export default Header;
