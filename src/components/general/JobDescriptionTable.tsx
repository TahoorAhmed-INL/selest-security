import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { Colors, UI, fontSizes } from '../../styles/custom';
import Button from '../ui/Button';
import { UserStackNavigationProp } from '../../lib/types';

interface JobDescriptionTableProps {
  startTime: string | number | Date;
  type: any;
  guardCount: any;
  state: any;
  city: any;
  address: any;
  timeDuration: any;
  message: any;
  data: Record<any, any>;
}

const TableRow = ({ itemLabel, value }: { itemLabel: string; value?: string }) => {
  return (
    <View style={[UI.flexRow, UI.alignCenter, UI.wFull, styles.rowContainer]}>
      <View
        style={[
          styles.label,
          styles.rowPadding,
          { flex: 0.4, backgroundColor: Colors.DarkBlue },
        ]}>
        <Text style={[styles.textLight, { fontSize: 11 }]}>{itemLabel}</Text>
      </View>
      <View
        style={[
          UI.flexRow,
          styles.rowPadding,
          styles.valueContainer,
          { flex: 0.6 },
        ]}>
        <Text style={[styles.valueText, fontSizes.pri]}>{value}</Text>
      </View>
    </View>
  );
};

export default function JobDescriptionTable({ data, navigation }: { data: JobDescriptionTableProps, navigation: UserStackNavigationProp }) {

  const transformedData = [
    {
      itemLabel: 'Job Start Date',
      value: new Date(data.startTime).toLocaleString(),
    },
    {
      itemLabel: 'Event Type',
      value: data.type,
    },
    {
      itemLabel: 'No of Guards',
      value: data.guardCount,
    },
    {
      itemLabel: 'State',
      value: data.state,
    },
    {
      itemLabel: 'City',
      value: data.city,
    },
    {
      itemLabel: 'Address',
      value: data.address,
    },
    {
      itemLabel: 'No of Hours',
      value: data.timeDuration,
    },
    {
      itemLabel: 'Message',
      value: data.message,
    },
  ];
  console.log(data, "rar")

  return (
    <View style={[UI.wFull, styles.table]}>
      {transformedData.map(i => (
        <TableRow key={i.itemLabel} itemLabel={i.itemLabel} value={i.value} />
      ))}
      {/* <View style={{ marginTop: 20 }}>
        <Button
          roundedFull
          // isLoading={true}
          onPress={() => navigation.navigate('edit-job', { data: data })}
          // onPress={()=>{}}
          gradient={true}
          text="Edit Job"
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    marginBottom: 10,
    marginTop: 4,
  },
  rowContainer: {
    marginTop: 8,
  },
  rowPadding: {
    paddingVertical: 16,
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
  },
  valueText: {
    marginLeft: 10,
    color: Colors.DarkBlue,
  },
  textLight: {
    color: '#fff',
  },
});
