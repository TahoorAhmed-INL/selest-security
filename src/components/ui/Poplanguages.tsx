import React, { Dispatch, SetStateAction } from 'react';
import { Text, Pressable, View } from 'react-native';

import CustomModal from './Modal';

import Button from './Button';
import { Colors, UI } from '../../styles/custom';
import { XCircle } from 'lucide-react-native';

interface PoplanguagesProps {
    isLoading: boolean;
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    title?: string;
    onConfirm: () => void;
    okText?: string;
    cancelText?: string;
}

const Poplanguages: React.FC<PoplanguagesProps> = ({
    isLoading,
    title = 'Language ',
    modalVisible,
    setModalVisible,
    onConfirm,
    okText = 'Apply',
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
                <CustomModal modalVisible={modalVisible} closeModal={handleCancel} padding={0} paddingTop={0}>
                    <>
                        <View style={{flexDirection:'row', backgroundColor: "#000027",paddingHorizontal:12,paddingVertical:12 }}>
                            <View style={[UI.wFull, { alignItems: 'center' }]}>
                                <Text style={{ color: '#fff' }}>{title}</Text>
                            </View>
                            <Pressable
                                style={{ position: 'absolute', right: 12, top: 12 }}
                                onPress={handleCancel}>
                                <XCircle color="#fff" size={20} />
                            </Pressable>
                        </View>
                        <View style={[UI.wFull, { alignItems: 'flex-start',borderBottomWidth:1,borderBottomColor:'#000027',paddingVertical: 10,paddingHorizontal:16 }]}>
                            <Text style={{ color: Colors.DarkGray, }}>English(United State)</Text>
                        </View>
                        <View style={[UI.wFull, { alignItems: 'flex-start',paddingVertical: 10 ,paddingHorizontal:16}]}>
                            <Text style={{ color: Colors.DarkGray,}}>French</Text>
                        </View>

                        <View style={{ flexDirection: 'row',justifyContent:"center",marginTop:6, marginBottom: 16,width:"100%" }}>
                            <Button
                                isLoading={isLoading}
                                style={{ paddingHorizontal: 30, paddingVertical: 10 }}
                                roundedFull
                                onPress={handleConfirm}
                                gradient={true}
                                text={okText}
                            />

                        </View>
                    </>
                </CustomModal>
            </Pressable>
        </>
    );
};

export default Poplanguages;
