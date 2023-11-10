import React from 'react';

import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';

import {useForm} from 'react-hook-form';

import {Colors, UI} from '../../../styles/custom';

import LogoBackground from '../../../components/general/LogoBackground';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

import {defaultRules} from '../../../lib/rules';
import MainOverlayHeader from '../../../components/general/MainOverlayHeader';
import MemberShipPlusBanner from '../../../components/general/MemberShipPlusBanner';

export default function Support() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<{message: string; subject: string}>({
    defaultValues: {
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: {subject: string; message: string}) => {
    console.log(data);
  };

  return (
    <SafeAreaView style={[UI.flexFull, {backgroundColor: '#fff'}]}>
      <LogoBackground />
      <View style={UI.flexFull}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={[UI.paddingX, UI.paddingY]}>
            <MainOverlayHeader
              textTop="QUALITY AND ACCESSIBLE SECURITY SERVICES"
              textBottom="FOR PERSONAL AND EVENT-BASED NEEDS"
            />
            <Input
              name="subject"
              style={styles.input}
              rules={defaultRules({fieldName: 'subject'})}
              errors={errors}
              control={control}
              placeholder="Subject"
              placeholderTextColor={Colors.Brown}
            />
            <Input
              multiline
              numberOfLines={10}
              editable
              name="message"
              style={styles.input}
              inputStyles={{textAlignVertical: 'top'}}
              rules={defaultRules({fieldName: 'message'})}
              errors={errors}
              control={control}
              placeholder="Enter your message..."
              placeholderTextColor={Colors.Brown}
            />
            <View style={[{marginTop: 20, marginBottom: 30}]}>
              <Button
                roundedFull
                onPress={handleSubmit(onSubmit)}
                gradient={true}
                text="Submit"
              />
            </View>
            <MemberShipPlusBanner />
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
    borderColor: Colors.Brown,
  },
});
