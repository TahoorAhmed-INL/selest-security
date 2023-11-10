import React, {useState} from 'react';

import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';

import {useForm} from 'react-hook-form';

import {Colors, UI, fontSizes} from '../../../styles/custom';

import LogoBackground from '../../../components/general/LogoBackground';
import StarRating from '../../../components/ui/FiveStarRating';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import MainOverlayHeader from '../../../components/general/MainOverlayHeader';
import MemberShipPlusBanner from '../../../components/general/MemberShipPlusBanner';
import {UserStackNavigationProp} from '../../../lib/types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {giveReview} from '../../../api-clients/apiServices';
import { useToast } from '../../../hooks/useToast';
import Toast from 'react-native-toast-message';

interface Params {
  orderId: string;
  completed?: boolean;
  guardId?: boolean;
  userId: number;
}

export default function Feedback({
  navigation,
}: {
  navigation: UserStackNavigationProp;
}) {
  const {params} = useRoute<RouteProp<Record<string, Params>, string>>();

  const {rejectToast,resolveToast} = useToast()

  console.log(navigation, 'feedback navigation');
  console.log(params, 'feedback params');

  const {control, handleSubmit} = useForm<{message: string}>({
    defaultValues: {
      message: '',
    },
  });

  const [rating, setRating] = useState<string | number>(4);

  const onSubmit = async (data: {message: string}) => {
    const body = {
      rating: rating,
      message: data?.message,
    };
    try {
      const res = await giveReview(params?.orderId, params?.userId, body);
      resolveToast("Thank you for your positive review! We appreciate your feedback","")
    } catch (err) {
      const error = err as Error; // Type assertion
      rejectToast(error?.message)
      console.log(error.message)
    } 
  };

  return (
    <SafeAreaView style={[UI.flexFull, {backgroundColor: '#fff'}]}>
      <LogoBackground />
      <View style={[UI.justifyCenter, UI.flexFull]}>
        <View>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={[UI.paddingX, UI.paddingY]}>
              <MainOverlayHeader
                textTop="We'd Really Appreciate"
                textBottom="Your Feedback"
              />
              <Text
                style={[
                  UI.textCenter,
                  {fontSize: 11, marginBottom: 10, color: Colors.DarkBlue},
                ]}>
                Please leave <Text style={{color: Colors.Brown}}>feedback</Text>{' '}
                and <Text style={{color: Colors.Brown}}>rate</Text>
              </Text>
              <StarRating
                style={{justifyContent: 'center'}}
                value={rating}
                setRating={setRating}
                selectable
              />
              <Text
                style={[
                  fontSizes.pri,
                  UI.textCenter,
                  {color: Colors.DarkBlue, marginVertical: 15},
                ]}>
                Tell us a bit more about your experience
              </Text>
              <Input
                eyeBg
                multiline
                numberOfLines={10}
                editable
                name="message"
                style={styles.input}
                inputStyles={{textAlignVertical: 'top'}}
                rules={undefined}
                control={control}
                placeholder="Message"
              />
              <View style={[{marginTop: 20, marginBottom: 20}]}>
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
              <Toast />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.Gray,
  },
});
