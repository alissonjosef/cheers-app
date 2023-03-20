import React from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

function Back (props) {
    return (
        <Pressable onPress={() => {props.goBack()}}>
            <Icon name='arrow-back-outline' size={30} color={'#40E0D0'} />
        </Pressable>
    )
}

export default Back; 