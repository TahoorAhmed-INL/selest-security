import React, {Dispatch, SetStateAction} from 'react';
import {Text, Pressable, View} from 'react-native';

import CustomModal from './Modal';

import Button from './Button';
import {Colors, UI} from '../../styles/custom';
import {XCircle} from 'lucide-react-native';

interface PopconfirmProps {
  isLoading: boolean;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  title?: string;
  onConfirm: () => void;
  okText?: string;
  cancelText?: string;
}

const Popconfirm: React.FC<PopconfirmProps> = ({
  isLoading,
  title = 'Are you sure',
  modalVisible,
  setModalVisible,
  onConfirm,
  okText = 'Yes',
  cancelText = 'No',
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Pressable
        onPress={() => {
          setModalVisible(true);
          console.log('running');
        }}>
        <CustomModal modalVisible={modalVisible} closeModal={handleCancel} padding={35} paddingTop={12}>
          <>
            <Pressable
              style={{position: 'absolute', right: 15, top: 14}}
              onPress={handleCancel}>
              <XCircle color="#000" size={20} />
            </Pressable>
            <View style={[UI.wFull, {alignItems: 'stretch'}]}>
              <Text style={{color: Colors.DarkGray}}>{title}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 30, gap: 15}}>
              <Button
                isLoading={isLoading}
                style={{paddingHorizontal: 30, paddingVertical: 10}}
                roundedFull
                onPress={handleConfirm}
                gradient={true}
                text={okText}
              />
              <Button
                style={{paddingHorizontal: 30, paddingVertical: 10}}
                roundedFull
                onPress={handleCancel}
                gradient={true}
                text={cancelText}
              />
            </View>
          </>
        </CustomModal>
      </Pressable>
    </>
  );
};

export default Popconfirm;
