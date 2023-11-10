import React, { useState, Dispatch } from 'react';

import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import DatePicker from 'react-native-date-picker';

import { Calendar } from 'lucide-react-native';

import { Colors, UI, fontSizes } from '../../styles/custom';

interface DatePickerProps {
  date: Date | null;
  setDate: Dispatch<any>;
  placeholder?: string;
  inputStyles: any
}

export default ({ date, inputStyles, placeholder = 'Date..', setDate }: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={inputStyles ? inputStyles : styles.container}
        onPress={() => setOpen(true)}>
        <Text style={[fontSizes.pri, { color: inputStyles ? '#fff' : Colors.DarkBlue }]}>
          {!date ? placeholder : date.toUTCString()}
        </Text>
        <Calendar size={inputStyles ? 16 : 20} color={inputStyles ? "#fff" : "#3e4040"} strokeWidth={2} />
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date ?? new Date()}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...UI.flexRow,
    ...UI.alignCenter,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.Brown,
    borderRadius: 11,
    padding: 12,
    paddingVertical: 17,
    width: '100%',
  },
});
