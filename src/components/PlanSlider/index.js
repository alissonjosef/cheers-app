import React from 'react'
import {Linking} from 'react-native'; 

import {Divider} from 'react-native-paper'; 

import {
PriceText,
PlanText,
PriceHeader,
MainContent,
ButtonBox,
ButtonPlan,
Slider} from './style';

import Icon from 'react-native-vector-icons/Ionicons';

export default function SliderBox(props) {

    const openPaymantLink = () => {
        if(props.isLogged){
            let link = props.url + `?prefilled_email=${props.email}&client_reference_id=${props.id}`
            Linking.openURL(link).catch(err => console.error('An error occurred', err));
            props.goBack()
        }
    }

    return (
        <Slider>
            <PriceHeader>
                <PriceHeader.space>
                <PlanText>{props.name}</PlanText>
                </PriceHeader.space>
                <PriceHeader.space>
                <PriceText>{props.price}</PriceText>
                </PriceHeader.space>
                <Divider style={{height:1,backgroundColor:'#40E0D0'}} />
            </PriceHeader>
            <MainContent>
                <MainContent.row>
                    <Icon name="checkmark-circle" color={'#FF0099'} size={25}/>
                    <MainContent.text>{props.offers.one}</MainContent.text>
                </MainContent.row>
                <MainContent.row>
                    <Icon name="checkmark-circle" color={'#FF0099'} size={25}/>
                    <MainContent.text>{props.offers.two}</MainContent.text>
                </MainContent.row>
                <MainContent.row>
                    <Icon name="checkmark-circle" color={'#FF0099'} size={25}/>
                    <MainContent.text>{props.offers.three}</MainContent.text>
                </MainContent.row>
            </MainContent>
            <ButtonBox>
                <ButtonPlan onPress={openPaymantLink}>
                    {props.isLogged?'Quero este plano':'Faça Login para escolher seu plano!'}
                </ButtonPlan> 
            </ButtonBox>              
        </Slider>
    )
}