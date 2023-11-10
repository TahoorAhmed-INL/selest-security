import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageSourcePropType,
  Image,
  ActivityIndicator,
} from 'react-native';

import {useRoute, RouteProp} from '@react-navigation/native';

import LogoBackground from '../../../components/general/LogoBackground';

import {Colors, UI, fontSizes} from '../../../styles/custom';
import StarRating from '../../../components/ui/FiveStarRating';
import {Avatar, SecurityGuard} from '../../../assets/images';

import Button from '../../../components/ui/Button';

import {UserStackNavigationProp} from '../../../lib/types';

import {useAppContext} from '../../../store/AppContext';
import {getOtherUserById} from '../../../api-clients/apiServices';
import {BASE_URL} from '../../../api';
import {useToast} from '../../../hooks/useToast';
import Toast from 'react-native-toast-message';

interface Params {
  orderId: string;
  completed?: boolean;
  guardId?: boolean;
  userId: number;
}

export default function GuardProfile({
  navigation,
}: {
  navigation: UserStackNavigationProp;
}) {
  const {params} = useRoute<RouteProp<Record<string, Params>, string>>();
  const {state} = useAppContext();
  const {rejectToast} = useToast();
  const {userType} = state;

  const isJobCompleted = params.completed ? true : false;

  const [rating] = useState<number | string>(3);

  type otherUserInfoType = {
    address: string;
    gender: string;
    contact: string;
    qualification: string;
    previousExperience: string;
    yearsOfExperience: number;
    email: string;
    name: string;
    picture: string;
    rating: number;
    licenseNumber: string;
    role: string;
    businessDetails: {
      businessId: string;
      businessName: string;
      businessRepresentative: string;
      businessType: string;
    };
    guardDetails: {
      licenseNumber: string;
      city: string;
      qualification: string;
      previousExperience: string;
      yearsOfExperience: string;
      gender: string;
    };
  };
  const guardOrUserId = params?.userId;

  const [otherUserInfo, setOtherUserInfo] = useState<otherUserInfoType | null>(
    null,
  );

  const guardOrUserIdtype = userType == 'individual' ? 'guard' : 'individual';

  const guardProfile = async () => {
    try {
      const res = await getOtherUserById(guardOrUserId);
      setOtherUserInfo(res);
      console.log(res, 'guard profile****');
    } catch (err) {
      console.log(err, 'dasd');
    }
  };

  useEffect(() => {
    guardProfile();
  }, []);

  console.log(otherUserInfo, 'otherUserInfo');
  console.log(params, 'paramsasdas');
  console.log(guardOrUserId, 'guardOrUserId');
  return (
    <SafeAreaView style={[UI.flexFull, {backgroundColor: '#fff'}]}>
      <LogoBackground />
      <View style={[UI.flexFull]}>
        <ScrollView>
          <View style={[UI.paddingX, UI.paddingY, {marginVertical: 2}]}>
            <View style={[UI.alignCenter, {maxHeight: 255}]}>
              {otherUserInfo?.picture ? (
                <Image
                  source={{uri: BASE_URL + '/' + otherUserInfo?.picture}}
                  style={{
                    borderRadius: 100,
                    marginTop: 7,
                    width: 180,
                    height: 180,
                  }}
                />
              ) : (
                <Image
                  source={Avatar as ImageSourcePropType}
                  style={styles.avatar}
                />
              )}
              <Text
                style={{
                  color: Colors.DarkBlue,
                  textTransform: 'capitalize',
                  fontSize: 24,
                  marginTop: 8,
                }}>
                {otherUserInfo?.name}
              </Text>
              {userType !== 'guard' ? (
                <StarRating
                  value={otherUserInfo?.rating}
                  style={{justifyContent: 'space-between', marginTop: 8}}
                />
              ) : null}
            </View>
            {otherUserInfo && Object.keys(otherUserInfo).length > 0 ? (
              userType !== 'guard' ? (
                <>
                  <RowItem label="Email" value={otherUserInfo?.email} />
                  <RowItem label="Phone" value={otherUserInfo?.contact} />
                  <RowItem
                    label="Gender"
                    value={otherUserInfo?.guardDetails?.gender}
                  />
                  <RowItem
                    label="City"
                    value={otherUserInfo?.guardDetails?.city}
                  />
                  <RowItem label="Address" value={otherUserInfo?.address} />
                  <RowItem
                    label="Qualification"
                    value={otherUserInfo?.guardDetails?.qualification}
                  />
                  <RowItem
                    label="Previous Experience"
                    value={otherUserInfo?.guardDetails?.previousExperience}
                  />
                  <RowItem
                    label="Years Of Experience"
                    value={otherUserInfo?.guardDetails?.yearsOfExperience}
                  />
                  <RowItem
                    label="Guard License No"
                    value={otherUserInfo?.guardDetails?.licenseNumber}
                  />
                </>
              ) : otherUserInfo?.role == 'business' ? (
                <>
                  <RowItem label="Name" value={otherUserInfo?.name} />
                  <RowItem label="Email" value={otherUserInfo?.email} />
                  <RowItem label="Phone" value={otherUserInfo?.contact} />
                  <RowItem label="Address" value={otherUserInfo?.address} />
                  <RowItem
                    label="Business Representative"
                    value={
                      otherUserInfo?.businessDetails?.businessRepresentative
                    }
                  />
                  <RowItem
                    label="Business ID"
                    value={otherUserInfo?.businessDetails?.businessId}
                  />
                  <RowItem
                    label="Business Name"
                    value={otherUserInfo?.businessDetails?.businessName}
                  />
                  <RowItem
                    label="Business Type"
                    value={otherUserInfo?.businessDetails?.businessType}
                  />
                </>
              ) : (
                <>
                  <RowItem label="Name" value={otherUserInfo?.name} />
                  <RowItem label="Email" value={otherUserInfo?.email} />
                  <RowItem label="Phone" value={otherUserInfo?.contact} />
                </>
              )
            ) : (
              <View style={{paddingVertical: 24}}>
                <ActivityIndicator color={Colors?.DarkBlue} size={24} />
              </View>
            )}
            {otherUserInfo && Object.keys(otherUserInfo).length > 0 ? (
              <View style={[{marginTop: 20}]}>
                <Button
                  roundedFull
                  onPress={
                    isJobCompleted
                      ? () =>
                          navigation.navigate('feedback', {
                            userId: params?.userId,
                            orderId: params?.orderId,
                            completed: isJobCompleted,
                          })
                      : () => {
                          rejectToast('Job is not completed yet.');
                        }
                  }
                  text="Rate Guard"
                />
              </View>
            ) : null}
          </View>
        </ScrollView>
        <Toast />
      </View>
    </SafeAreaView>
  );
}

const RowItem = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined | number;
}) => {
  return (
    <View style={[UI.wFull, UI.flexRow, UI.alignCenter, {marginTop: 14}]}>
      <View
        style={[
          styles.label,
          styles.rowPadding,
          {flex: 0.5, backgroundColor: Colors.DarkBlue},
        ]}>
        <Text style={[{color: '#fff'}, fontSizes.pri]}>{label}</Text>
      </View>
      <View
        style={[
          styles.rowPadding,
          styles.valueContainer,
          {flex: 0.5, height: '100%'},
        ]}>
        <Text style={[fontSizes.pri, {flex: 0.5, color: Colors.DarkBlue}]}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeActive: {
    backgroundColor: Colors.Brown,
    color: '#fff',
    borderRadius: 4,
  },
  rowContainer: {
    marginTop: 8,
  },
  avatar: {
    borderRadius: 100,
    marginTop: 7,
    maxWidth: 180,
    maxHeight: 180,
  },
  rowPadding: {
    paddingVertical: 14,
    paddingRight: 8,
    paddingLeft: 14,
  },
  label: {
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    height: '100%',
  },
  valueContainer: {
    borderWidth: 0.5,
    borderColor: Colors.Brown,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
  },
  valueText: {
    marginLeft: 10,
    color: Colors.DarkBlue,
  },
  textLight: {
    color: '#fff',
  },
});
