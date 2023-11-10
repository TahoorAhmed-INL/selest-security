import React, { useEffect, useState } from 'react';

import { View, useWindowDimensions, StyleSheet, ImageSourcePropType, Image, TouchableOpacity, Text, Platform, ActivityIndicator } from 'react-native';

import { useForm } from 'react-hook-form';
import { Colors, UI } from '../../../styles/custom';


import { UserStackNavigationProp, editProfileBusinessOwner } from '../../../lib/types';
import EditProfileRow from '../../general/EditProfileRow';
import Input from '../../ui/Input';
import { defaultRules, emailRules, passwordRules, phoneRules } from '../../../lib/rules';
import Button from '../../ui/Button';
import { SecurityGuard } from '../../../assets/images';
import { PenBox } from 'lucide-react-native';
import { useAppContext } from '../../../store/AppContext';
import { capitalizeFirstLetter } from '../../../lib/helpers';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { updatePassword, updateUser } from '../../../api-clients/apiServices';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { BASE_URL, axiosInstance } from '../../../api';

export default function EditBusinessOwnerForm({ navigation }: { navigation: UserStackNavigationProp; }) {

  const { width } = useWindowDimensions();
  const textScaleFactor = width / 350;

  const { state, getUser } = useAppContext();

  const userInfo = state?.storedData

  const [isSelected, setSelection] = useState(true)
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState<any>(null);
  // const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isImageUpload, setImageUpload] = useState(false)
  const [isPassMatched, setIsPassMatched] = useState(false)
  const [servorError, setServorError] = useState<any>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<editProfileBusinessOwner>({
    defaultValues: {
      representative: userInfo?.businessDetails?.businessRepresentative,
      businessName: userInfo?.businessDetails?.businessName,
      businessId: userInfo?.businessDetails?.businessId,
      address: userInfo?.address,
      businessType: userInfo?.businessDetails?.businessType,
      email: userInfo?.email,
      phone: userInfo?.contact,
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: editProfileBusinessOwner) => {
    console.log(data, "update Business user  profile");
    const updateBusinessUserInfo = {
      address: data?.address, // max 100 char
      businessId: data?.businessId, // max 100 char
      businessRepresentative: data?.representative, //max 100 char
      businessName: data?.businessName, // max 100 char
      businessType: data?.businessType // max 100 char
    }
    console.log(updateBusinessUserInfo)
    const updateBusinessUserPassword = {
      oldPassword: data?.oldPassword,
      newPassword: data?.password
    }
    console.log(updateBusinessUserPassword)

    if (!isSelected) {
      setIsLoading(true)
      if (data.password !== data.confirmPassword) {
        setIsPassMatched(true)
        setTimeout(() => {
          setIsPassMatched(false)
        }, 3000)
        setIsLoading(false)
        return;
      } else {
        try {
          const resUpdatePassword = await updatePassword(updateBusinessUserPassword)
          if (resUpdatePassword == null) {
            const res = await updateUser(state?.userType, updateBusinessUserInfo)
            console.log(navigation)
            getUser()
            navigation.navigate('user-profile')
          }
        } catch (err) {
          const error = err as Error; // Type assertion
          setServorError(error.message);
        } finally {
          setIsLoading(false)
        }
      }
    } else {
      setIsLoading(true)
      try {
        const res = await updateUser(state?.userType, updateBusinessUserInfo)
        console.log(navigation)
        getUser()
        navigation.navigate('user-profile')
      } catch (err) {
        const error = err as Error; // Type assertion
        setServorError(error.message);
      } finally {
        setIsLoading(false)
      }
    }
  };


  const options = {
    mediaType: 'photo',
    // Add more options as needed
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
        setImageUpload(true)
        const form = new FormData();
        const image = newImage?.assets[0].uri
        let splittedUri = image.split('.');
        let _image;
        let imageName =
          Platform.OS == 'android'
            ? image.split('/cache/')[1]
            : image.split('/image/')[1];
        _image = {
          uri: image,
          type: `image/${splittedUri[splittedUri.length - 1]}`,
          name: imageName
        };
        form.append('user', _image);
        console.log(_image, "image 1323")
        const res = await axiosInstance.patch('/api/users/picture', form, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: state?.token,
          },
        })
        getUser()
        console.log(res.data.message, "asdas******")
      } catch (err) {
        console.log(err, "asdasdasd")
        const error = err as Error; // Type assertion
        console.log(error.message, "upload errorororor****************")
        // setServorError(err);
      } finally {
        setImageUpload(false)
      }
    }
  }

  useEffect(() => {
    if(newImage){
      updateProfileImage()
    }
  }, [newImage])
  console.log(state?.userType)
  return (
    <>
      <View style={UI.relative}>
        {newImage !== null ?
          (
            <View style={{ position: 'relative' }}>
              {newImage.assets && newImage.assets.length > 0 && (
                <Image
                  source={{ uri: newImage.assets[0].uri }}
                  style={{ height: 270, borderRadius: 13, marginTop: 12 }}
                />
              )}
              <View style={{ position: "absolute", top: '50%', left: "50%" }}>
                {isImageUpload && <ActivityIndicator color={Colors?.DarkBlue} size={24} />}
              </View>
            </View>
          )
          :
          (state?.storedData?.picture !== null ?
            <Image
              source={{ uri: BASE_URL + "/" + state?.storedData?.picture }}
              style={{ height: 270, borderRadius: 13, marginTop: 12 }}
            />
            :
            <Image
              source={SecurityGuard as ImageSourcePropType}
              style={{ width: 'auto', borderRadius: 13, marginTop: 12 }}
            />
          )
        }
        <TouchableOpacity
          style={styles.icon}
          activeOpacity={0.6}
          onPress={openGeller}>
          <PenBox color={Colors.Brown} size={30} />
        </TouchableOpacity>
      </View>

      <EditProfileRow textScaleFactor={textScaleFactor} label="business Name">
        <Input
          defaultMargin={false}
          inputStyles={{
            fontSize: 10 * textScaleFactor,
            color: '#fff',
            padding: 5 * textScaleFactor,
            paddingVertical: 9 * textScaleFactor,
            paddingLeft: 14,
            backgroundColor: Colors.DarkBlue,
          }}
          editable={true}
          eyeBg={false}
          name="businessName"
          style={styles.input}
          rules={defaultRules({ fieldName: 'name', length: 3 })}
          errors={errors}
          control={control}
          placeholder="businessName"
          placeholderTextColor="#fff"
        />
      </EditProfileRow>
      <EditProfileRow textScaleFactor={textScaleFactor} label="Business Type">
        <Input
          defaultMargin={false}
          inputStyles={{
            fontSize: 10 * textScaleFactor,
            color: '#fff',
            padding: 5 * textScaleFactor,
            paddingVertical: 9 * textScaleFactor,
            paddingLeft: 14,
            backgroundColor: Colors.DarkBlue,
          }}
          editable={true}
          eyeBg={false}
          name="businessType"
          style={styles.input}
          rules={defaultRules({ fieldName: 'name', length: 3 })}
          errors={errors}
          control={control}
          placeholder="Name"
          placeholderTextColor="#fff"
        />
      </EditProfileRow>
      <EditProfileRow textScaleFactor={textScaleFactor} label="Representative">
        <Input
          defaultMargin={false}
          inputStyles={{
            fontSize: 10 * textScaleFactor,
            color: '#fff',
            padding: 5 * textScaleFactor,
            paddingVertical: 9 * textScaleFactor,
            paddingLeft: 14,
            backgroundColor: Colors.DarkBlue,
          }}
          editable={true}
          eyeBg={false}
          name="representative"
          style={styles.input}
          rules={defaultRules({ fieldName: 'name', length: 3 })}
          errors={errors}
          control={control}
          placeholder="Name"
          placeholderTextColor="#fff"
        />
      </EditProfileRow>
      <EditProfileRow textScaleFactor={textScaleFactor} label="Business Id">
        <Input
          defaultMargin={false}
          inputStyles={{
            fontSize: 10 * textScaleFactor,
            color: '#fff',
            padding: 5 * textScaleFactor,
            paddingVertical: 9 * textScaleFactor,
            paddingLeft: 14,
            backgroundColor: Colors.DarkBlue,
          }}
          editable={true}
          eyeBg={false}
          name="businessId"
          style={styles.input}
          rules={defaultRules({ fieldName: 'name', length: 3 })}
          errors={errors}
          control={control}
          placeholder="Name"
          placeholderTextColor="#fff"
        />
      </EditProfileRow>
      <EditProfileRow textScaleFactor={textScaleFactor} label="Phone No">
        <Input
          defaultMargin={false}
          inputStyles={{
            fontSize: 10 * textScaleFactor,
            color: Colors.DarkBlue,
            padding: 5 * textScaleFactor,
            paddingVertical: 9 * textScaleFactor,
            paddingLeft: 14,
            backgroundColor: Colors.LightGray,
          }}
          editable={false}
          eyeBg={false}
          name="phone"
          style={styles.input}
          rules={phoneRules}
          errors={errors}
          control={control}
          placeholder="Phone no"
          placeholderTextColor="#fff"
        />
      </EditProfileRow>
      <EditProfileRow textScaleFactor={textScaleFactor} label="Email">
        <Input
          defaultMargin={false}
          inputStyles={{
            fontSize: 10 * textScaleFactor,
            color: Colors.DarkBlue,
            padding: 5 * textScaleFactor,
            paddingVertical: 9 * textScaleFactor,
            paddingLeft: 14,
            backgroundColor: Colors.LightGray,
          }}
          editable={false}
          eyeBg={false}
          name="email"
          style={styles.input}
          rules={emailRules}
          errors={errors}
          control={control}
          placeholder="Email address"
          placeholderTextColor="#fff"
        />
      </EditProfileRow>
      <EditProfileRow textScaleFactor={textScaleFactor} label="Address">
        <Input
          defaultMargin={false}
          inputStyles={{
            fontSize: 10 * textScaleFactor,
            color: '#fff',
            padding: 5 * textScaleFactor,
            paddingVertical: 9 * textScaleFactor,
            paddingLeft: 14,
            backgroundColor: Colors.DarkBlue,
          }}
          name="address"
          style={styles.input}
          rules={defaultRules({ fieldName: 'address' })}
          errors={errors}
          control={control}
          placeholder="Address"
          placeholderTextColor="#fff"
          eyeBg={false}
          editable={true} />
      </EditProfileRow>

      <View style={{ marginTop: 9, width: '50%' }}>

        <BouncyCheckbox
          size={18}
          fillColor={Colors.DarkBlue}
          unfillColor={Colors.Silver}
          text="Change Password"
          textStyle={{ textDecorationLine: 'none' }}
          iconStyle={{ borderColor: "" }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={(isSelected: boolean) => { setSelection(!isSelected) }}
        />

      </View>


      {!isSelected &&
        <>
          <EditProfileRow textScaleFactor={textScaleFactor} label="Old Password" >
            <Input
              rules={passwordRules}
              defaultMargin={false}
              secureTextEntry={true}
              inputStyles={{
                fontSize: 10 * textScaleFactor,
                color: '#fff',
                padding: 5 * textScaleFactor,
                paddingVertical: 9 * textScaleFactor,
                paddingLeft: 14,
                backgroundColor: Colors.DarkBlue,
              }}
              editable={!isSelected}
              eyeBg={true}
              name="oldPassword"
              type="password"
              style={styles.input}
              errors={errors}
              control={control}
              placeholder="Old password"
              placeholderTextColor="#fff"
            />
          </EditProfileRow>
          <EditProfileRow textScaleFactor={textScaleFactor} label="Password">
            <Input
              rules={passwordRules}
              defaultMargin={false}
              secureTextEntry={true}
              inputStyles={{
                fontSize: 10 * textScaleFactor,
                color: '#fff',
                padding: 5 * textScaleFactor,
                paddingVertical: 9 * textScaleFactor,
                paddingLeft: 14,
                backgroundColor: Colors.DarkBlue,
              }}
              editable={!isSelected}
              eyeBg={true}
              name="password"
              type="password"
              style={styles.input}
              errors={errors}
              control={control}
              placeholder="New password"
              placeholderTextColor="#fff"
            />
          </EditProfileRow>
          <EditProfileRow textScaleFactor={textScaleFactor} label="Confirm Password">
            <Input
              rules={passwordRules}
              defaultMargin={false}
              secureTextEntry={true}
              inputStyles={{
                fontSize: 10 * textScaleFactor,
                color: '#fff',
                padding: 0,
                paddingVertical: 8 * textScaleFactor,
                paddingLeft: 14,
                backgroundColor: Colors.DarkBlue,
              }}
              editable={!isSelected}
              eyeBg={true}
              name="confirmPassword"
              type="password"
              style={styles.input}
              errors={errors}
              control={control}
              placeholder="Confirm password"
              placeholderTextColor="#fff"
            />
            {isPassMatched &&
              <Text style={styles.error}>
                {capitalizeFirstLetter("Password do not match.")}
              </Text>
            }
          </EditProfileRow>
        </>
      }
      <View style={{ marginTop: 4 }}>
        {servorError &&
          <Text style={styles.error}>
            {servorError}
          </Text>
        }
      </View>
      <View style={[{ marginTop: 20 }]}>
        <Button roundedFull onPress={handleSubmit(onSubmit)} text="Update" isLoading={isLoading} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 0,
    overflow: 'hidden',
    borderRadius: 0,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    borderColor: Colors.Gray,
  },
  error: {
    color: '#ff4e39',
    fontSize: 10,
    paddingLeft: 4,
    marginBottom: 4,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 22,
  },
  checkbox: {
    alignSelf: 'center',
  },
});





























// import React from 'react';

// import {View, useWindowDimensions, StyleSheet} from 'react-native';

// import {useForm} from 'react-hook-form';

// import {Colors} from '../../../styles/custom';

// import {editProfileIndividual} from '../../../lib/types';
// import EditProfileRow from '../../general/EditProfileRow';
// import Input from '../../ui/Input';
// import {defaultRules, emailRules, phoneRules} from '../../../lib/rules';
// import Button from '../../ui/Button';

// export default function EditBusinessOwnerForm() {
//   const {width} = useWindowDimensions();
//   const textScaleFactor = width / 350;

//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm<editProfileIndividual>({
//     defaultValues: {
//       name: 'John Morris',
//       phone: '51512123213',
//       email: 'example@gmail.com',
//       address: 'example@gmail.com',
//       password: '',
//       confirmPassword: '',
//     },
//   });

//   const onSubmit = (data: {name: string; phone: string}) => {
//     console.log(data);
//   };

//   return (
//     <>
//       <EditProfileRow textScaleFactor={textScaleFactor} label="Name">
//         <Input
//           defaultMargin={false}
//           inputStyles={{
//             fontSize: 10 * textScaleFactor,
//             color: '#fff',
//             padding: 5 * textScaleFactor,
//             paddingVertical: 9 * textScaleFactor,
//             paddingLeft: 14,
//             backgroundColor: Colors.DarkBlue,
//           }}
//           name="name"
//           style={styles.input}
//           rules={defaultRules({fieldName: 'name', length: 3})}
//           errors={errors}
//           control={control}
//           placeholder="Name"
//         />
//       </EditProfileRow>
//       <EditProfileRow textScaleFactor={textScaleFactor} label="Phone No">
//         <Input
//           defaultMargin={false}
//           inputStyles={{
//             fontSize: 10 * textScaleFactor,
//             color: '#fff',
//             padding: 5 * textScaleFactor,
//             paddingVertical: 9 * textScaleFactor,
//             paddingLeft: 14,
//             backgroundColor: Colors.DarkBlue,
//           }}
//           name="phone"
//           style={styles.input}
//           rules={phoneRules}
//           errors={errors}
//           control={control}
//           placeholder="Phone no"
//         />
//       </EditProfileRow>
//       <EditProfileRow textScaleFactor={textScaleFactor} label="Email">
//         <Input
//           defaultMargin={false}
//           inputStyles={{
//             fontSize: 10 * textScaleFactor,
//             color: '#fff',
//             padding: 5 * textScaleFactor,
//             paddingVertical: 9 * textScaleFactor,
//             paddingLeft: 14,
//             backgroundColor: Colors.DarkBlue,
//           }}
//           name="email"
//           style={styles.input}
//           rules={emailRules}
//           errors={errors}
//           control={control}
//           placeholder="Email address"
//         />
//       </EditProfileRow>
//       <EditProfileRow textScaleFactor={textScaleFactor} label="Address">
//         <Input
//           defaultMargin={false}
//           inputStyles={{
//             fontSize: 10 * textScaleFactor,
//             color: '#fff',
//             padding: 5 * textScaleFactor,
//             paddingVertical: 9 * textScaleFactor,
//             paddingLeft: 14,
//             backgroundColor: Colors.DarkBlue,
//           }}
//           name="address"
//           style={styles.input}
//           rules={defaultRules({fieldName: 'address'})}
//           errors={errors}
//           control={control}
//           placeholder="Address"
//         />
//       </EditProfileRow>
//       <EditProfileRow textScaleFactor={textScaleFactor} label="Password">
//         <Input
//           defaultMargin={false}
//           inputStyles={{
//             fontSize: 10 * textScaleFactor,
//             color: '#fff',
//             padding: 5 * textScaleFactor,
//             paddingVertical: 9 * textScaleFactor,
//             paddingLeft: 14,
//             backgroundColor: Colors.DarkBlue,
//           }}
//           name="password"
//           style={styles.input}
//           errors={errors}
//           control={control}
//           placeholder="New password"
//           placeholderTextColor="#fff"
//         />
//       </EditProfileRow>
//       <EditProfileRow
//         textScaleFactor={textScaleFactor}
//         label="Confirm Password">
//         <Input
//           defaultMargin={false}
//           inputStyles={{
//             fontSize: 10 * textScaleFactor,
//             color: '#fff',
//             padding: 5 * textScaleFactor,
//             paddingVertical: 9 * textScaleFactor,
//             paddingLeft: 14,
//             backgroundColor: Colors.DarkBlue,
//           }}
//           name="confirmPassword"
//           style={styles.input}
//           errors={errors}
//           control={control}
//           placeholder="Confirm password"
//           placeholderTextColor="#fff"
//         />
//       </EditProfileRow>
//       <View style={[{marginTop: 20}]}>
//         <Button roundedFull onPress={handleSubmit(onSubmit)} text="Update" />
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   input: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     paddingHorizontal: 0,
//     overflow: 'hidden',
//     borderRadius: 0,
//     borderTopRightRadius: 9,
//     borderBottomRightRadius: 9,
//     borderColor: Colors.Gray,
//   },
// });
