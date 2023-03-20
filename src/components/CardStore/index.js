import React from 'react';
import { TouchableOpacity ,ImageBackground , View } from 'react-native'; 
import { BarBox } from './style';
import Background from '../../assets/img/establishment_without_photo.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../../Util/constants';

export default function CardBox(props) {
   
    return (
        <View opacity={0.7} style={{height:150,margin:3}}>
            <TouchableOpacity  style={{flex:1}} onPress={() => {props.navigation.navigate('Bar', {barId:props.data.item.id})}} >
                <ImageBackground source={props.data.item.image_bar ? {uri:BASE_URL + props.data.item.image_bar} :Background} style={{flex:1,justifyContent:'flex-end'}} >
                        <BarBox>
                            <View style={{flex:2}}>
                                <BarBox.Text>{props.data?.item.nome_negocio}</BarBox.Text>
                                <BarBox.SubText>{props.data?.item.descricao_negocio}</BarBox.SubText>
                            </View>
                            {props.data.value?.favor &&
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Icon name="heart" size={20} color="#FF0099"/>
                            </View>}
                        </BarBox>
                </ImageBackground> 
            </TouchableOpacity>    
        </View>          
            
    )    
}
