import React, {ReactNode} from 'react';
import {Modal, StyleSheet, View, TouchableOpacity} from 'react-native';

import {boxShadow} from '../../styles/custom';

interface CustomModalProps {
  modalVisible: boolean;
  closeModal: () => void;
  children: ReactNode;
  padding:number
  paddingTop:number
}

const CustomModal = ({
  modalVisible,
  closeModal,
  children,
  padding,
  paddingTop
}: CustomModalProps) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <TouchableOpacity
          style={[styles.overlay, boxShadow.sec]}
          activeOpacity={1}
          onPress={closeModal}>
          <View style={styles.centeredView}>
            <View style={[{padding:padding,paddingTop:paddingTop},styles.modalView]}>{children}</View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    marginTop: 22,
  },
  modalView: {
    overflow:"hidden",
    // margin: 40,
    width:'75%',
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    // paddingTop: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)', // You can adjust the opacity and color here
  },
});

export default CustomModal;
