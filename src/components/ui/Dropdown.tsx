/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';

import { Text } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import { Colors, UI, boxShadow, fontSizes } from '../../styles/custom';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

interface DropDownProps {
  //   open: boolean;
  //   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  flatBottom?: boolean;
  highlighted?: boolean;
  placeholder?: string;
  label?: string;
  value: string;
  isSignup: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const Dropdown = ({
  //   open,
  //   setOpen,
  flatBottom = false,
  highlighted,
  placeholder,
  label,
  value,
  setValue,
  items,
  setItems,
  isSignup=false
}: DropDownProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Text style={UI.label}>{label}</Text>
      <DropDownPicker
        open={open}
        style={{
          backgroundColor: highlighted ? Colors.DarkBlue : '#fff',
          borderColor: !highlighted ? Colors.Brown : undefined,
          paddingVertical: 16,
          borderBottomEndRadius: flatBottom ? 0 : 8,
          borderBottomStartRadius: flatBottom ? 0 : 8,
        }}

        dropDownContainerStyle={{
          borderColor: Colors.GrayV2,
          ...boxShadow.sec,
        }}
        ArrowUpIconComponent={() => (
          <ChevronUp color={highlighted ? '#fff' : '#000'} size={20} />
        )}
        ArrowDownIconComponent={() => (
          <ChevronDown color={highlighted ? '#fff' : '#000'} size={20} />
        )}
        placeholderStyle={[fontSizes.pri, { color: isSignup ? '#fff' : "#000"  }]}
        containerStyle={{ height: open ? 220 : 53 }}
        itemSeparatorStyle={{
          backgroundColor: Colors.GrayV2,
        }}
        selectedItemLabelStyle={{
          color: '#fff',
        }}
        selectedItemContainerStyle={{
          backgroundColor: Colors.DarkBlue,
          
        }}
        listItemContainerStyle={{
          height: 55,
        }}
        labelStyle={[fontSizes.pri, { color: isSignup ? '#fff' : "#000" }]}
        value={value}
        placeholder={placeholder}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        itemSeparator={true}
        setItems={setItems}
        listMode="SCROLLVIEW"
      />
    </>
  );
};

export default Dropdown;
