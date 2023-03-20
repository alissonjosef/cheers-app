import React, { useState, useEffect } from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import {ButtonFavoritar} from './style'

function FavoritCard ({}) {
  
    return(
        <>
        <Card>
            <Card.Cover  source={{ uri: 'https://picsum.photos/700' }} />

            <ButtonFavoritar>
                <Icon name='heart-outline' size={15} color={'#ff0099'}/>
            </ButtonFavoritar>
        </Card>
        </>
     
    )
}

export default FavoritCard