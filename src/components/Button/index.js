import * as React from 'react';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const ButtonContainer = ({ icon = false, title, ...props }) => {
    return (
        <Button
            icon={() => (
                <Icon name={icon} size={12} color={'#FFF'} />
            )}
            color="#FF0099" mode="contained"
            labelStyle={{ fontSize: 10 }}
            style={{ width: '50%', marginBottom: 10 }}
            {...props}
        >
            {title}
        </Button>)
}

export default ButtonContainer;