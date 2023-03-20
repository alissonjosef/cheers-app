import React, {Component} from 'react';
import {TouchableOpacity,ImageBackground,View,Text} from 'react-native'; 
import {BarBox} from './style';
import Background from '../../assets/img/man.jpg';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../../Util/constants';
import withoutPhoto from '../../assets/img/establishment_without_photo.png';
export default function CardLike({navigation,value = false}) {
        return (
            <View opacity={0.8} style={{height:150,margin:3}}>
                <TouchableOpacity  style={{flex:1}} onPress={() => {navigation.navigate('Bar', {barId:value.id})}} >
                    <ImageBackground source={value.image_bar ? {uri:BASE_URL + value.image_bar} : withoutPhoto} style={{flex:1,justifyContent:'flex-end'}} >
                            <BarBox>
                                <View style={{flex:2}}>
                                    <BarBox.Text>{value.nome_negocio}</BarBox.Text>
                                    <BarBox.SubText>{value.endereco}</BarBox.SubText>
                                </View>
                                {value?.favor &&
                                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <Icon name="heart" size={20} color="#FF0099"/>
                                </View>}
                            </BarBox>
                    </ImageBackground> 
                </TouchableOpacity>
     
            </View>          
               
        )
    
}
