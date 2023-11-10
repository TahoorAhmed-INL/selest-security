import React, { useState, useEffect } from 'react';

import { SafeAreaView, View, ScrollView, Text, StyleSheet, useWindowDimensions } from 'react-native';

import { useRoute, RouteProp } from '@react-navigation/native';

import LogoBackground from '../../../components/general/LogoBackground';

import { Colors, UI, boxShadow } from '../../../styles/custom';


import { UserStackNavigationProp } from '../../../lib/types';
import EditProfileRow from '../../../components/general/EditProfileRow';
import Input from '../../../components/ui/Input';
import { defaultRules, numericOnlyRules } from '../../../lib/rules';
import { useForm } from 'react-hook-form';
import DatePicker from '../../../components/ui/DatePicker';
import Button from '../../../components/ui/Button';


interface Params {
  data: {
    startTime: string;
    type: string;
    guardCount: number;
    state: string;
    city: string;
    address: string;
    timeDuration: number;
    message: string;
  }
}

export default function EditJobDescription({ navigation, }: { navigation: UserStackNavigationProp; }) {
  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();
  const { width } = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState<null | any>(null);
  const textScaleFactor = width / 350;

  type editJob = {
    startTime: string;
    type: string;
    guardCount: string;
    state: string;
    city: string;
    address: string;
    timeDuration: string;
    message: string;
  }


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<editJob>({
    defaultValues: {
      startTime: params?.data?.startTime,
      type: params?.data?.type,
      timeDuration: params?.data?.timeDuration.toString(),
      guardCount: params?.data?.guardCount.toString(),
      state: params?.data?.state,
      city: params?.data?.city,
      address: params?.data?.address,
      // coordinates: "67.1219564,57.156464",
      // message: data.message,
      // amount: 100
    },
  });
  const onSubmit = (data:editJob) => {
    console.log(data,"hjashdjkas")
  }


  console.log(params.data?.guardCount, "878&*&*&*&*&*")
  return (
    <SafeAreaView style={[UI.flexFull, { backgroundColor: '#fff' }]}>
      <LogoBackground />
      <View style={[UI.flexFull, UI.justifyCenter]}>
        <ScrollView>
          <View style={[UI.paddingX]}>
            <EditProfileRow textScaleFactor={textScaleFactor} label="Job Start Date">
              <DatePicker date={selectedDate} setDate={setSelectedDate}
                inputStyles={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: 'space-between',
                  fontSize: 10 * textScaleFactor,
                  color: '#fff',
                  borderColor: Colors.Brown,
                  padding: 5 * textScaleFactor,
                  paddingVertical: 13 * textScaleFactor,
                  paddingLeft: 14,
                  backgroundColor: Colors.DarkBlue,
                  borderWidth: 1,
                  // paddingHorizontal: 0,
                  overflow: "hidden",
                  borderTopRightRadius: 9,
                  borderBottomRightRadius: 9,
                }}
              />
            </EditProfileRow>
            <EditProfileRow textScaleFactor={textScaleFactor} label="Event Type">
              <Input
                defaultMargin={false}
                inputStyles={{
                  fontSize: 10 * textScaleFactor,
                  color: '#fff',
                  padding: 5 * textScaleFactor,
                  paddingVertical: 8 * textScaleFactor,
                  paddingLeft: 14,
                  backgroundColor: Colors.DarkBlue,
                }}
                editable={true}
                eyeBg={false}
                name="type"
                style={styles.input}
                rules={defaultRules({ fieldName: 'type', length: 3 })}
                errors={errors}
                control={control}
                placeholder="Name"
                placeholderTextColor="#fff"
              />
            </EditProfileRow>
            <EditProfileRow textScaleFactor={textScaleFactor} label="No of Guard">
              <Input
                defaultMargin={false}
                inputStyles={{
                  fontSize: 10 * textScaleFactor,
                  color: '#fff',
                  padding: 5 * textScaleFactor,
                  paddingVertical: 8 * textScaleFactor,
                  paddingLeft: 14,
                  backgroundColor: Colors.DarkBlue,
                }}
                editable={true}
                eyeBg={false}
                name="guardCount"
                style={styles.input}
                rules={numericOnlyRules}
                errors={errors}
                control={control}
                placeholder="No of Guard"
                placeholderTextColor="#fff"
              />
            </EditProfileRow>
            <EditProfileRow textScaleFactor={textScaleFactor} label="State">
              <Input
                defaultMargin={false}
                inputStyles={{
                  fontSize: 10 * textScaleFactor,
                  color: '#fff',
                  padding: 5 * textScaleFactor,
                  paddingVertical: 8 * textScaleFactor,
                  paddingLeft: 14,
                  backgroundColor: Colors.DarkBlue,
                }}
                editable={true}
                eyeBg={false}
                name="state"
                style={styles.input}
                rules={defaultRules({ fieldName: 'state', length: 3 })}
                errors={errors}
                control={control}
                placeholder="state"
                placeholderTextColor="#fff"
              />
            </EditProfileRow>
            <EditProfileRow textScaleFactor={textScaleFactor} label="City">
              <Input
                defaultMargin={false}
                inputStyles={{
                  fontSize: 10 * textScaleFactor,
                  color: '#fff',
                  padding: 5 * textScaleFactor,
                  paddingVertical: 8 * textScaleFactor,
                  paddingLeft: 14,
                  backgroundColor: Colors.DarkBlue,
                }}
                editable={true}
                eyeBg={false}
                name="city"
                style={styles.input}
                rules={defaultRules({ fieldName: 'city', length: 3 })}
                errors={errors}
                control={control}
                placeholder="City"
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
                  paddingVertical: 8 * textScaleFactor,
                  paddingLeft: 14,
                  backgroundColor: Colors.DarkBlue,
                }}
                editable={true}
                eyeBg={false}
                name="address"
                style={styles.input}
                rules={defaultRules({ fieldName: 'address', length: 3 })}
                errors={errors}
                control={control}
                placeholder="Address"
                placeholderTextColor="#fff"
              />
            </EditProfileRow>
            <EditProfileRow textScaleFactor={textScaleFactor} label="No of Hours">
              <Input
                defaultMargin={false}
                inputStyles={{
                  fontSize: 10 * textScaleFactor,
                  color: '#fff',
                  padding: 5 * textScaleFactor,
                  paddingVertical: 8 * textScaleFactor,
                  paddingLeft: 14,
                  backgroundColor: Colors.LightGray,
                }}
                editable={false}
                eyeBg={false}
                name="timeDuration"
                style={styles.input}
                rules={numericOnlyRules}
                errors={errors}
                control={control}
                placeholder="No of Hours"
                placeholderTextColor="#fff"
              />
            </EditProfileRow>
            {/* <EditProfileRow textScaleFactor={textScaleFactor} label="Message">
              <Input
                defaultMargin={false}
                inputStyles={{
                  fontSize: 10 * textScaleFactor,
                  color: '#fff',
                  padding: 5 * textScaleFactor,
                  paddingVertical: 8 * textScaleFactor,
                  paddingLeft: 14,
                  backgroundColor: Colors.DarkBlue,
                }}
                editable={true}
                eyeBg={false}
                name="name"
                style={styles.input}
                rules={defaultRules({ fieldName: 'name', length: 3 })}
                errors={errors}
                control={control}
                placeholder="Name"
                placeholderTextColor="#fff"
              />
            </EditProfileRow> */}
            <View style={{ marginTop: 20 }}>
              <Button
                roundedFull
                // isLoading={true}
                // onPress={() => navigation.navigate('edit-job', { data: data })}
                onPress={handleSubmit(onSubmit)}
                gradient={true}
                text="Update Job"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
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
    borderColor: Colors.Brown,
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