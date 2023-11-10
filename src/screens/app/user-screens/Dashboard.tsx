import React, {useState} from 'react';

import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageSourcePropType,
  ScrollView,
} from 'react-native';

import {Clock3, FilePlus2} from 'lucide-react-native';

import {UI} from '../../../styles/custom';

import MainOverlayHeader from '../../../components/general/MainOverlayHeader';
import Drawer from '../../../components/ui/Drawer';
import Header from '../../../components/ui/Header';
import ActionButton from '../../../components/ui/ActionButton';

import {
  CurrentImage,
  CurrentOrdersNew,
  DashboardBanner,
  HireAGuardNew,
  MyHoursIcon,
  NewJobsIcon,
  PreviousOrderImage,
  PreviousOrdersNew,
} from '../../../assets/images';

import {useAppContext} from '../../../store/AppContext';
import MemberShipPlusBanner from '../../../components/general/MemberShipPlusBanner';

const styles = StyleSheet.create({
  icon: {
    maxWidth: 40,
    maxHeight: 40,
  },
  logo: {
    flex: 4 / 12,
    width: '100%',
    alignSelf: 'center',
    paddingBottom: 20,
  },
});

const UserRoutes = [
  {
    id: 1,
    text: 'Hire a Guard',
    to: 'hire-guard',
    icon: (
      <View style={styles.icon}>
        <Image
          style={styles.icon}
          source={HireAGuardNew as ImageSourcePropType}
        />
      </View>
    ),
  },
  {
    id: 2,
    text: 'Previous Order',
    to: 'previous-order',
    icon: (
      <View style={styles.icon}>
        <Image
          style={styles.icon}
          source={PreviousOrdersNew as ImageSourcePropType}
        />
      </View>
    ),
  },
  {
    id: 3,
    text: 'Current Order',
    to: 'current-order',
    icon: (
      <View style={styles.icon}>
        <Image
          style={styles.icon}
          source={CurrentOrdersNew as ImageSourcePropType}
        />
      </View>
    ),
  },
];

const GuardRoutes = [
  {
    id: 5,
    text: 'New Jobs',
    to: 'new-jobs',
    icon: (
      <View style={styles.icon}>
        <Image
          style={styles.icon}
          source={NewJobsIcon as ImageSourcePropType}
        />
      </View>
    ),
  },
  {
    id: 2,
    text: 'Previous Jobs',
    to: 'previous-order',
    icon: (
      <View style={styles.icon}>
        <Image
          style={styles.icon}
          source={PreviousOrdersNew as ImageSourcePropType}
        />
      </View>
    ),
  },
  {
    id: 3,
    text: 'Current Jobs',
    to: 'current-order',
    icon: (
      <View style={styles.icon}>
        <Image
          style={styles.icon}
          source={CurrentOrdersNew as ImageSourcePropType}
        />
      </View>
    ),
  },
  {
    id: 1,
    text: 'My Hours',
    to: 'my-hours',
    icon: (
      <View style={styles.icon}>
        <Image
          style={styles.icon}
          source={MyHoursIcon as ImageSourcePropType}
        />
      </View>
    ),
  },
];

const UserDashboard = () => {
  const {state} = useAppContext();
  const {userType} = state;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
console.log(userType)
  return (
    <Drawer open={isDrawerOpen} setOpen={setIsDrawerOpen}>
      <SafeAreaView style={[UI.flexFull, {backgroundColor: '#fff'}]}>
        <Header
          title={userType !== 'guard' ? 'User Dashboard' : 'Guard Home'}
          openDrawer={() => setIsDrawerOpen(true)}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={[UI.flexFull, UI.justifyBetween, UI.paddingX]}>
            <View style={[UI.alignCenter, {marginTop: 24}]}>
              <Image
                style={{
                  width: '100%',
                  borderRadius: 10,
                  height: 80,
                  resizeMode: 'cover',
                }}
                source={DashboardBanner as ImageSourcePropType}
              />
            </View>
            <View style={{marginVertical: 5}}>
              <MainOverlayHeader
                textTop="QUALITY AND ACCESSIBLE SECURITY SERVICES"
                textBottom="FOR PERSONAL AND EVENT-BASED NEEDS"
              />
              <View style={[UI.flexRow, UI.justifyBetween]}>
                {userType !== 'guard'
                  ? UserRoutes.map(i => (
                      <ActionButton
                        style={{flex: 1}}
                        key={i.id}
                        to={i.to}
                        icon={i.icon}
                        text={i.text}
                      />
                    ))
                  : GuardRoutes.map(i => (
                      <ActionButton
                        style={{flex: 1}}
                        key={i.id}
                        to={i.to}
                        icon={i.icon}
                        text={i.text}
                      />
                    ))}
              </View>
            </View>
            <MemberShipPlusBanner />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Drawer>
  );
};

export default UserDashboard;
