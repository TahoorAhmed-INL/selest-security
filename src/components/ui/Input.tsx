import React, {FC, ReactNode, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TextInputProps,
  Text,
} from 'react-native';
import {Colors, UI, fontSizes} from '../../styles/custom';
import {EyeIcon, EyeOff} from 'lucide-react-native';

import {Controller} from 'react-hook-form';
import {capitalizeFirstLetter} from '../../lib/helpers';

interface InputProps extends TextInputProps {
  icon?: ReactNode;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  type?: string;
  rules?: Record<any, any>;
  name: string;
  control: any;
  placeholderTextColor?: string;
  defaultMargin?: boolean;
  label?: string;
  inputStyles?: TextStyle;
  errors?: Record<any, any>;
  eyeBg:boolean;
  editable:boolean;
  // defaultValue:string
}

const Input: FC<InputProps> = ({
  defaultMargin = true,
  icon,
  name,
  rules,
  control,
  errors,
  placeholderTextColor,
  label,
  inputStyles,
  eyeBg=false,
  editable=true,
  // defaultValue,
  ...rest
}) => {
  const [isInputSecure, setIsInputSecure] = useState(
    rest.secureTextEntry ?? false,
  );
  return (
    <>
      <Controller
        control={control ?? ''}
        rules={rules}
        // defaultValue={defaultValue}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={[{marginTop: defaultMargin ? 15 : 0}]}>
            {label && (
              <Text style={[fontSizes.pri, styles.labelStyle]}>{label}</Text>
            )}
            <View style={[styles.container, rest.style]}>
              {icon && <View style={styles.iconContainer}>{icon}</View>}
              <TextInput
                {...rest}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="none"
                placeholderTextColor={placeholderTextColor ?? Colors.DarkBlue}
                style={[styles.input, {...inputStyles}]}
                secureTextEntry={isInputSecure}
                editable={editable}
                
              />
              {rest.type === 'password' ? (
               <View style={{backgroundColor:eyeBg ? Colors?.DarkBlue :'#f2f2f2',height:'100%',flexDirection:'row',alignItems:"center",paddingRight:8}}>
                 <TouchableOpacity
                  activeOpacity={0.33}
                  onPress={() => setIsInputSecure(!isInputSecure)}>
                  {isInputSecure ? (
                    <EyeIcon size={18} color="#adadad" />
                  ) : (
                    <EyeOff size={18} color="#adadad" />
                  )}
                </TouchableOpacity>
               </View>
              ) : null}
            </View>
          </View>
        )}
        name={name}
      />
      {errors !== undefined && errors[name] && (
        <Text style={styles.error}>
          {capitalizeFirstLetter(errors[name]?.message)}
        </Text>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    ...UI.flexRow,
    ...UI.alignCenter,
    // backgroundColor: Colors.Gray,
    borderRadius: 13,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.Brown,
    // paddingVertical: 5,
    width: '100%',
  },
  iconContainer: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: Colors.DarkGray,
    ...fontSizes.pri,
  },
  error: {
    color: '#ff4e39',
    fontSize: 10,
    paddingLeft: 4,
    marginTop: 1,
  },
  labelStyle: {
    color: Colors.DarkBlue,
    marginBottom: 5,
    paddingLeft: 2,
  },
});

export default Input;
