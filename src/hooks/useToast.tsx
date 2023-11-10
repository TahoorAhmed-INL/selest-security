import Toast from "react-native-toast-message";
export const useToast = () => {

    const resolveToast = (message: string, already: string) => {
        Toast.show({
            type: 'success',
            text1: already ? already : 'Success',
            text2: message,
            visibilityTime: 3000,
            position: "top",
        });
    };
    const rejectToast = (message: string) => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: message,
            visibilityTime: 3000,
            position: "top",
        });
    };
    return { resolveToast, rejectToast }
}