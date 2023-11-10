import React, {Dispatch} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import {Colors} from '../../styles/custom';

export default function Checkbox({
  isChecked,
  setIsChecked,
}: {
  isChecked: boolean;
  setIsChecked: Dispatch<boolean>;
}) {
  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <BouncyCheckbox
      isChecked={isChecked}
      size={23}
      fillColor={Colors.Brown}
      unfillColor="#FFFFFF"
      text=""
      iconStyle={{borderColor: Colors.Brown}}
      innerIconStyle={{borderWidth: 1}}
      textStyle={{fontFamily: 'JosefinSans-Regular'}}
      onPress={handleCheckboxChange}
    />
  );
}
