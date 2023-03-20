import {Alert} from 'react-native'; 
import {Platform} from 'react-native'; 

export const isIOS  = Platform.OS === 'ios';

export const success = (mensagem) => {
    return Alert.alert(mensagem);
}

export const error = (mensagem) => {
    return Alert.alert(mensagem);
}

export const isValidData = (data) => {
    return (Array.isArray(data) && data.length != 0 ); 
}