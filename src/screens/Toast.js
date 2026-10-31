// toast.js
import Toast from 'react-native-simple-toast';

export const showToast = (message, duration = 3000) => {
    Toast.show(message, duration);
};
