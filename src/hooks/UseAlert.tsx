import {Alert} from 'react-native';

interface AlertOptions {
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
}

const useAlert = () => {
  const showAlert = ({
    title,
    message,
    cancelText = 'Cancel',
    confirmText = 'OK',
  }: AlertOptions) => {
    return new Promise<void>(resolve => {
      Alert.alert(
        title,
        message,
        [
          {
            text: cancelText,
            onPress: () => resolve(),
            style: 'cancel',
          },
          {
            text: confirmText,
            onPress: () => resolve(),
          },
        ],
        {cancelable: false},
      );
    });
  };

  return showAlert;
};

export default useAlert;
