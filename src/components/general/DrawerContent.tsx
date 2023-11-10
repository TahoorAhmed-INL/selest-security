import React, { useState, useEffect } from 'react';

import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import {
  Globe,
  UserCircle,
  ScrollText,
  HelpCircle,
  X,
  LogOut,
  PenBox,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react-native';

import { useAppContext } from '../../store/AppContext';

import { Colors, UI, fontSizes } from '../../styles/custom';

import { extractInitials } from '../../lib/helpers';

import DrawerLinkItem from './DrawerLinkItem';

import Popconfirm from '../ui/Popconfirm';

import { LogoBrown, LogoBrownBadge } from '../../assets/images';
import { COMPANY_DATA } from '../../lib/constants';
import Poplanguages from '../ui/Poplanguages';
import { BASE_URL } from '../../api';

export default function DrawerContent({ onClose }: { onClose: () => void }) {
  const { navigate } = useNavigation<any>();
  const route = useRoute();
  console.log(route.name);
  const { width, height } = useWindowDimensions();
  const textScaleFactor = width / 350;

  const { state: { storedData }, dispatch, } = useAppContext();

  const [confirmLogout, setConfirmLogout] = useState(false);
  const [changeLang, setChangeLang] = useState(false);

  const name = storedData?.name ?? '';
  const image = storedData?.picture ? storedData?.picture : false;

  useEffect(() => {
    if (route.name === 'Home-logout') {
      setConfirmLogout(true);
    }
  }, [route]);

  return (
    <>
      <View
        style={[
          UI.flexRow,
          UI.justifyBetween,
          UI.alignCenter,
          {
            paddingHorizontal: 12,
            paddingVertical: 20,
            borderBottomWidth: 0.4,
            borderColor: Colors.Brown,
          },
        ]}>
        <Image style={styles.logo} source={LogoBrown as ImageSourcePropType} />
        <TouchableOpacity activeOpacity={0.7} onPress={() => onClose()}>
          <X color={Colors.Brown} size={22} strokeWidth={4} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.profileContainer,
          UI.flexRow,
          UI.justifyBetween,
          UI.alignCenter, { flex: 1 }
        ]}>
        <View style={[UI.flexRow, UI.alignCenter, { gap: 10, flex: .9 }]}>
          {image ? (
            image &&
            <Image
              style={styles.profileImage}
              source={{ uri: BASE_URL + "/" + image }}
            />
          ) : (
            <View
              style={[UI.alignCenter, UI.justifyCenter, styles.initialsText]}>
              <Text
                style={{
                  color: '#000027',
                }}>
                {extractInitials(name)}
              </Text>
            </View>
          )}
          <Text style={[styles.userText, { fontSize: 15 * textScaleFactor, flex: 1 }]}>
            {name}
          </Text>
        </View>
        <View style={{ flex: .1 }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigate('edit-profile')}>
            <PenBox color={Colors.Brown} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <DrawerLinkItem
        onPress={() => navigate('user-profile')}
        label="Profile"
        Icon={UserCircle}
      />
      <DrawerLinkItem
        onPress={() => { setChangeLang(true) }}
        label="Language" Icon={Globe}
      />
      <DrawerLinkItem
        onPress={() => navigate('terms-and-conditions')}
        label="Terms and Conditions"
        Icon={ScrollText}
      />
      <DrawerLinkItem
        onPress={() => navigate('support')}
        label="Support"
        Icon={HelpCircle}
      />
      <DrawerLinkItem
        onPress={() => setConfirmLogout(true)}
        label="Logout"
        Icon={LogOut}
      />
      <View style={[UI.justifyCenter, UI.flexRow, { marginTop: 40 }]}>
        <Image
          source={LogoBrownBadge as ImageSourcePropType}
          style={[
            styles.logoSec,
            {
              width: width * 0.28,
              height: height * 0.21,
            },
          ]}
        />
      </View>
      <Text
        style={[
          fontSizes.pri,
          UI.textCenter,
          {
            paddingHorizontal: 10,
            color: '#fff',
            fontSize: 12 * textScaleFactor,
            marginTop: 15,
          },
        ]}>
        We offer comprehensive security services while taking into account your
        requirements
      </Text>
      <Text
        style={[
          fontSizes.pri,
          UI.textCenter,
          {
            paddingHorizontal: 10,
            color: Colors.Brown,
            fontSize: 12 * textScaleFactor,
            marginTop: 2,
          },
        ]}>
        Reach Out to us for further details
      </Text>
      <View style={{ alignItems: 'center', marginTop: 13, marginBottom: 10 }}>
        <View
          style={{ width: '60%', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 0.5, height: 2, backgroundColor: '#fff' }} />
          <View style={{ flex: 0.5, height: 2, backgroundColor: Colors.Brown }} />
        </View>
      </View>
      <View style={[UI.flexRow, UI.justifyCenter, { gap: 10 }]}>
        <Facebook
          strokeWidth={0}
          fill={Colors.Brown}
          size={20}
          color={Colors.Brown}
        />
        <Twitter
          strokeWidth={0}
          fill={Colors.Brown}
          size={20}
          color={Colors.Brown}
        />
        <Linkedin
          size={20}
          color={Colors.Brown}
          fill={Colors.Brown}
          strokeWidth={0}
        />
        <Instagram size={20} color={Colors.Brown} />
      </View>
      <View
        style={[
          UI.flexRow,
          UI.alignCenter,
          { paddingLeft: 16, gap: 9, marginTop: 36 },
        ]}>
        <MapPin size={20} color={Colors.Brown} />
        <Text style={[fontSizes.pri, { color: '#fff', paddingRight: 10 }]}>
          {COMPANY_DATA.address}
        </Text>
      </View>
      <View
        style={[
          UI.flexRow,
          UI.alignCenter,
          { paddingLeft: 16, gap: 9, marginTop: 16 },
        ]}>
        <Mail size={20} color={Colors.Brown} />
        <Text style={[fontSizes.pri, { color: '#fff' }]}>
          {COMPANY_DATA.mail}
        </Text>
      </View>
      <View
        style={[
          UI.flexRow,
          UI.alignCenter,
          { paddingLeft: 16, gap: 9, marginTop: 16 },
        ]}>
        <Phone size={20} color={Colors.Brown} />
        <Text style={[fontSizes.pri, { color: '#fff' }]}>
          {COMPANY_DATA.phone}
        </Text>
      </View>
      <Popconfirm
        isLoading={false}
        modalVisible={confirmLogout}
        setModalVisible={setConfirmLogout}
        onConfirm={() => dispatch({ type: 'LOGOUT' })}
      />
      <Poplanguages
        isLoading={false}
        modalVisible={changeLang}
        setModalVisible={setChangeLang}
        onConfirm={() => { }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: Colors.DarkBlue,
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  userText: {
    color: '#fff',
    fontSize: 16,
  },
  profileImage: { width: 40, height: 40, borderRadius: 50 },
  initialsText: {
    backgroundColor: '#fff',
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  logo: {
    maxWidth: 150,
    maxHeight: 40,
  },
  logoSec: {
    width: '60%',
    height: 150,
    resizeMode: 'contain',
  },
});
