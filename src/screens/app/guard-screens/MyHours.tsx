import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import {Colors, UI} from '../../../styles/custom';

import LogoBackground from '../../../components/general/LogoBackground';
import MemberShipPlusBanner from '../../../components/general/MemberShipPlusBanner';
import {getHours} from '../../../api-clients/apiServices';

const MyHoursData = [
  {
    id: 1,
    label: 'California street',
    data: {
      hours: 4,
      amount: 100,
      status: 'pending',
    },
  },
  {
    id: 2,
    label: 'Concert job',
    data: {
      hours: 4,
      amount: 60,
      status: 'pending',
    },
  },
  {
    id: 3,
    label: 'Houston, nashville',
    data: {
      hours: 10,
      amount: 90,
      status: 'pending',
    },
  },
  {
    id: 4,
    label: 'Houston, nashville',
    data: {
      hours: 10,
      amount: 100,
      status: 'paid',
    },
  },
  {
    id: 5,
    label: 'New york',
    data: {
      hours: 3,
      amount: 50,
      status: 'paid',
    },
  },
  {
    id: 6,
    label: 'New york',
    data: {
      hours: 3,
      amount: 50,
      status: 'paid',
    },
  },
  {
    id: 7,
    label: 'New york',
    data: {
      hours: 3,
      amount: 50,
      status: 'paid',
    },
  },
];

export default function MyHours() {
  const {width} = useWindowDimensions();
  const textScaleFactor = width / 350;

  const getHoursHandler = async () => {
    try {
      const res =await getHours();
      console.log(res,"get my Hours")
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHoursHandler();
  }, []);
  return (
    <SafeAreaView
      style={[UI.flexFull, {backgroundColor: '#fff', height: '100%'}]}>
      <LogoBackground />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 10,
          marginBottom: 10,
          justifyContent: 'space-between',
        }}
        style={UI.paddingX}>
        {/* USING ID IN PARAMS TO FETCH ORDER RELATED DATA */}
        <View style={{marginBottom: 10}}>
          <View
            style={[
              UI.flexRow,
              {
                backgroundColor: Colors.Brown,
                paddingHorizontal: 8,
                paddingVertical: 13,
                borderTopEndRadius: 8,
                borderTopStartRadius: 8,
              },
            ]}>
            <Text
              style={{
                flex: 0.5,
                color: '#fff',
                fontSize: 10 * textScaleFactor,
              }}>
              Location
            </Text>
            <View style={[UI.flexRow, UI.justifyBetween, {flex: 0.5}]}>
              <Text style={{color: '#fff', fontSize: 10 * textScaleFactor}}>
                Hours
              </Text>
              <Text style={{color: '#fff', fontSize: 10 * textScaleFactor}}>
                Amount
              </Text>
              <Text style={{color: '#fff', fontSize: 10 * textScaleFactor}}>
                Status
              </Text>
            </View>
          </View>
          {MyHoursData.map((i, idx) => (
            <RowItem
              idx={idx}
              textScaleFactor={textScaleFactor}
              key={i.id}
              label={i.label}
              data={i.data}
              dataLength={MyHoursData.length}
            />
          ))}
        </View>

        <MemberShipPlusBanner />
      </ScrollView>
    </SafeAreaView>
  );
}

const RowItem = ({
  label,
  data,
  textScaleFactor,
  idx,
  dataLength,
}: {
  label: string;
  data: Record<any, any>;
  textScaleFactor: any;
  idx: number;
  dataLength: number;
}) => {
  const isPaid = data.status.toLowerCase() === 'paid';

  const isEven = idx % 2 === 0;

  return (
    <View
      style={[
        UI.wFull,
        UI.flexRow,
        UI.alignCenter,
        UI.justifyCenter,
        {backgroundColor: isEven ? '#d3c6a3' : '#b9a56b'},
      ]}>
      <Text
        style={[
          styles.color,
          {
            flex: 0.45,
            fontSize: 10 * textScaleFactor,
            paddingLeft: 7,
            paddingVertical: 14,
            borderLeftWidth: 1,
            borderColor: Colors.Brown,
          },
        ]}>
        {label}
      </Text>
      <View
        style={[
          styles.valueContainer,
          UI.flexRow,
          UI.justifyBetween,
          styles.row,
          {flex: 0.55, backgroundColor: isEven ? '#d3c6a3' : '#b9a56b'},
        ]}>
        <Text
          style={{
            fontSize: 10 * textScaleFactor,
            color: Colors.DarkBlue,
            paddingVertical: 14,
            paddingHorizontal: 5,
            flex: 0.3333,
            textAlign: 'center',
          }}>
          {data.hours} Hours
        </Text>
        <Text
          style={{
            fontSize: 10 * textScaleFactor,
            color: Colors.DarkBlue,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: Colors.Brown,
            paddingVertical: 14,
            paddingHorizontal: 5,
            textAlign: 'center',
            flex: 0.3333,
          }}>
          $ {data.amount}
        </Text>
        <Text
          style={{
            fontSize: 10 * textScaleFactor,
            color: isPaid ? 'green' : Colors.DarkBlue,
            paddingVertical: 14,
            paddingHorizontal: 5,
            textAlign: 'center',
            flex: 0.3333,
          }}>
          {data.status}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.Brown,
  },
  color: {
    color: Colors.DarkBlue,
  },
  valueContainer: {
    flex: 0.5,
  },
});
