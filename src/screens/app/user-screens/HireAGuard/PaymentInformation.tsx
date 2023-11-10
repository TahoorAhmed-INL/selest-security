import React, {useState} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Colors, UI, fontSizes} from '../../../../styles/custom';
import Button from '../../../../components/ui/Button';
import LogoBackground from '../../../../components/general/LogoBackground';
import Checkbox from '../../../../components/ui/Checkbox';

import {UserStackNavigationProp} from '../../../../lib/types';

const PaymentRow = ({itemKey, value}: {itemKey: string; value?: string}) => {
  return (
    <View
      style={[
        UI.flexFull,
        UI.flexRow,
        {
          width: '100%',
          marginTop: '8%',
        },
      ]}>
      <View
        style={[
          styles.label,
          styles.rowPadding,
          {flex: 0.5, backgroundColor: Colors.DarkBlue},
        ]}>
        <Text style={[fontSizes.pri, {color: '#fff'}]}>{itemKey}</Text>
      </View>
      <View
        style={[
          UI.flexRow,
          styles.rowPadding,
          styles.valueContainer,
          {flex: 0.5},
        ]}>
        <Text style={[styles.valueText, styles.textDark, fontSizes.pri]}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default function PaymentInformation({
  navigation,
}: {
  navigation: UserStackNavigationProp;
}) {
  const [areTermsAccepted, setAreTermsAccepted] = useState<boolean>(false);

  return (
    <SafeAreaView style={[UI.flexFull, {backgroundColor: '#fff'}]}>
      <LogoBackground />
      <ScrollView>
        <View style={[UI.flexFull, UI.paddingX]}>
          {/* THIS IS STATIC, WE HAVE TO MAP OVER AN ARRAY*/}
          <PaymentRow
            itemKey="Name"
            value="Jackson Morrisasdasdasdadsasdasdad"
          />
          <PaymentRow itemKey="Date" value="Jackso" />
          <PaymentRow itemKey="Type of Event" value="Jackso" />
          <PaymentRow itemKey="No of Guards" value="Jackso" />
          <PaymentRow
            itemKey="Address"
            value="lorem ipsum, lorem ipsumlorem ipsum"
          />
          <PaymentRow itemKey="No of Hours" value="12 Hours" />
          <PaymentRow itemKey="Message" value="" />
          <PaymentRow itemKey="Total Cost" value="$500" />
          <View
            style={[
              UI.flexFull,
              UI.flexRow,
              UI.justifyBetween,
              UI.alignCenter,
              styles.my6,
            ]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('terms-and-conditions');
              }}>
              <Text
                style={{color: Colors.Brown, textDecorationLine: 'underline'}}>
                Accept terms and conditions
              </Text>
            </TouchableOpacity>
            <Checkbox
              isChecked={areTermsAccepted}
              setIsChecked={setAreTermsAccepted}
            />
          </View>
        </View>
        <View style={[styles.mb5, {paddingHorizontal: 14}]}>
          <Button
            roundedFull
            onPress={() => navigation.navigate('your-guards', {orderId: 1})}
            gradient={true}
            text="Pay"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  valueText: {
    paddingLeft: 5,
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
  textDark: {
    color: Colors.DarkBlue,
  },
  my6: {
    marginVertical: 28,
  },
  mb5: {
    marginBottom: 24,
  },
});
