import React, {useState, useEffect} from 'react';

import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  useWindowDimensions,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';

import {PenBox} from 'lucide-react-native';

import {Colors, UI} from '../../../../styles/custom';

import LogoBackground from '../../../../components/general/LogoBackground';
import Button from '../../../../components/ui/Button';

import {Avatar, SecurityGuard} from '../../../../assets/images';

import {UserStackNavigationProp} from '../../../../lib/types';
import {useAppContext} from '../../../../store/AppContext';
import {BASE_URL, axiosInstance} from '../../../../api';
import StarRating from '../../../../components/ui/FiveStarRating';
import {launchImageLibrary} from 'react-native-image-picker';

export default function MyProfile({
  navigation,
}: {
  navigation: UserStackNavigationProp;
}) {
  const {state, getUser} = useAppContext();
  const {userType} = state;
  console.log(state?.storedData, 'user data in profile data');
  const userProfile = state?.storedData;
  const [newImage, setNewImage] = useState<any>(null);
  const [isImageUpload, setImageUpload] = useState(false);

  const options = {
    mediaType: 'photo',
  };
  const openGeller = async () => {
    try {
      const result = await launchImageLibrary(options);
      if (result?.didCancel) {
      } else {
        setNewImage(result);
      }
    } catch (error) {
      setNewImage(null);
      console.log(error);
    }
  };

  const updateProfileImage = async () => {
    if (newImage) {
      try {
        setImageUpload(true);
        const form = new FormData();
        const image = newImage?.assets[0].uri;
        let splittedUri = image.split('.');
        let _image;
        let imageName =
          Platform.OS == 'android'
            ? image.split('/cache/')[1]
            : image.split('/image/')[1];
        _image = {
          uri: image,
          type: `image/${splittedUri[splittedUri.length - 1]}`,
          name: imageName,
        };
        form.append(state?.userType, _image);
        console.log(_image, 'image 1323');
        const res = await axiosInstance.patch('/api/users/picture', form, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: state?.token,
          },
        });
        getUser();
        console.log(res.data.message, 'asdas******');
      } catch (err) {
        console.log(err, 'asdasdasd');
        const error = err as Error; // Type assertion
        console.log(error.message, 'upload errorororor****************');
        // setServorError(err);
      } finally {
        setImageUpload(false);
      }
    }
  };
  useEffect(() => {
    if (newImage) {
      updateProfileImage();
    }
  }, [newImage]);

  return (
    <SafeAreaView style={[UI.flexFull, {backgroundColor: '#fff'}]}>
      <LogoBackground />
      <View style={[UI.flexFull, {marginTop: 20}]}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{paddingBottom: 16, paddingHorizontal: 20}}>
            <View style={[UI.alignCenter, {maxHeight: 255}]}>
              <View style={{borderRadius: 100}}>
                {userProfile?.picture ? (
                  <View>
                    <Image
                      source={{uri: BASE_URL + '/' + userProfile?.picture}}
                      style={{
                        borderRadius: 100,
                        marginTop: 7,
                        width: 180,
                        height: 180,
                      }}
                    />
                    {userType === 'guard' && (
                      <View
                        style={{position: 'absolute', top: '50%', left: '50%'}}>
                        {isImageUpload && (
                          <ActivityIndicator
                            color={Colors?.DarkBlue}
                            size={24}
                          />
                        )}
                      </View>
                    )}
                  </View>
                ) : (
                  <Image
                    source={Avatar as ImageSourcePropType}
                    style={styles.avatar}
                  />
                )}
                {userType === 'guard' && (
                  <TouchableOpacity
                    style={styles.icon}
                    activeOpacity={0.6}
                    onPress={openGeller}>
                    <PenBox color={Colors.DarkBlue} size={30} />
                  </TouchableOpacity>
                )}
              </View>
              <Text
                style={{
                  color: Colors.DarkBlue,
                  textTransform: 'capitalize',
                  fontSize: 24,
                  marginTop: 8,
                }}>
                {userProfile?.name}
              </Text>
              {userType == 'guard' ? (
                <StarRating
                  value={userProfile?.rating}
                  style={{justifyContent: 'space-between', marginTop: 8}}
                />
              ) : null}
            </View>
            {userType === 'individual' && (
              <>
                <RowItem label="Name" value={state?.storedData?.name} />
                <RowItem label="Phone No" value={state?.storedData?.contact} />
                <RowItem label="Email" value={state?.storedData?.email} />
                <RowItem label="Address" value={state?.storedData?.address} />
                {/* <RowItem label="Password" value="********" /> */}
              </>
            )}
            {userType === 'business' && (
              <>
                <RowItem
                  label="Business Name"
                  value={userProfile?.businessDetails?.businessName}
                />
                <RowItem
                  label="Type of Business"
                  value={userProfile?.businessDetails?.businessType}
                />
                <RowItem
                  label="Business Representative"
                  value={userProfile?.businessDetails?.businessRepresentative}
                />
                <RowItem
                  label="Business ID"
                  value={userProfile?.businessDetails?.businessId}
                />
                <RowItem label="Email" value={userProfile?.email} />
                <RowItem label="Phone" value={userProfile?.contact} />
                <RowItem label="Address" value={userProfile?.address} />
              </>
            )}
            {userType === 'guard' && (
              <>
                <RowItem label="Full Name" value={userProfile?.name} />
                <RowItem label="Phone" value={userProfile?.contact} />
                <RowItem label="City" value={userProfile?.guardDetails?.city} />
                <RowItem label="Address" value={userProfile?.address} />
                <RowItem
                  label="Qualification"
                  value={userProfile?.guardDetails?.qualification}
                />
                <RowItem
                  label="Gender"
                  value={userProfile?.guardDetails?.gender}
                />
                <RowItem
                  label="Previous Experience"
                  value={userProfile?.guardDetails?.previousExperience}
                />
                <RowItem
                  label="Years Of Experience"
                  value={userProfile?.guardDetails?.yearsOfExperience}
                />
                <RowItem
                  label="Guard License No"
                  value={userProfile?.guardDetails?.licenseNumber}
                />
              </>
            )}
            {/* <View style={UI.relative}>
              {userProfile?.picture !== null ? (
                <Image
                  source={{uri: BASE_URL + '/' + userProfile?.picture}}
                  style={{height: 270, borderRadius: 13, marginTop: 12}}
                />
              ) : (
                <Image
                  source={SecurityGuard as ImageSourcePropType}
                  style={{width: 'auto', borderRadius: 13, marginTop: 12}}
                />
              )}
            </View> */}

            <View style={[{marginTop: 20}]}>
              <Button
                roundedFull
                onPress={() => navigation.navigate('edit-profile')}
                gradient={true}
                text="Edit"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const RowItem = ({label, value}: {label: string; value: string}) => {
  const {width} = useWindowDimensions();
  const textScaleFactor = width / 350;

  return (
    <View
      style={[
        UI.wFull,
        UI.flexRow,
        UI.alignCenter,
        UI.justifyCenter,
        {marginTop: 12},
      ]}>
      <View
        style={[
          styles.rowPadding,
          styles.valueContainer,
          {flex: 0.5, height: '100%'},
        ]}>
        <Text
          style={[
            styles.color,
            styles.valueText,
            {fontSize: 12 * textScaleFactor},
          ]}>
          {label}
        </Text>
      </View>
      <View
        style={[
          styles.label,
          styles.rowPadding,
          {flex: 0.5, backgroundColor: '#fff'},
        ]}>
        <Text
          style={[
            styles.color,
            {
              fontSize: 13 * textScaleFactor,
            },
          ]}>
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.Gray,
  },
  color: {
    color: Colors.DarkGray,
  },
  rowPadding: {
    paddingVertical: 14,
    paddingRight: 8,
    paddingLeft: 14,
  },
  label: {
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    borderWidth: 1,
    borderColor: Colors.Brown,
    height: '100%',
  },
  avatar: {
    borderRadius: 100,
    marginTop: 7,
    maxWidth: 180,
    maxHeight: 180,
  },
  valueContainer: {
    backgroundColor: Colors.DarkBlue,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },
  valueText: {
    marginLeft: 10,
    color: '#fff',
  },
  icon: {
    position: 'absolute',
    right: 10,
    bottom: 40,
  },
});
