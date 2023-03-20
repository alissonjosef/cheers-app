import React from 'react';
import { Pressable , InputText } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

function Search (props) {
    return (
        <Pressable onPress={() => {}}>
            <Icon name='md-search' size={25} color={'#40E0D0'} />
        </Pressable>
    )
}

export default Search;
