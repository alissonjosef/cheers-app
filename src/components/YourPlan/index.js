import React from 'react'

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

export default function YourPlan(props) {
    const {
        subscription_value,
        userData
    } = props
    const offers = {
        one:'Um drink por dia durante 7 dias em qualquer bar e restaurante parceiro; ',
        two:'Sem limitação de horário; ',
        three:'Te oferecemos 7 drinks na sua semana, com uma assinatura no precinho de 1.'
    }
    return (
        <Slider>
            <PriceHeader>
                <PriceHeader.space>
                <PlanText>{userData.name}</PlanText>
                </PriceHeader.space>
                <PriceHeader.space>
                <PriceText>{subscription_value}</PriceText>
                </PriceHeader.space>
                <Divider style={{height:1,backgroundColor:'#40E0D0'}} />
            </PriceHeader>
            <MainContent>
                <MainContent.row>
                    <Icon name="checkmark-circle" color={'#FF0099'} size={25}/>
                    <MainContent.text>{offers.one}</MainContent.text>
                </MainContent.row>
                <MainContent.row>
                    <Icon name="checkmark-circle" color={'#FF0099'} size={25}/>
                    <MainContent.text>{offers.two}</MainContent.text>
                </MainContent.row>
                <MainContent.row>
                    <Icon name="checkmark-circle" color={'#FF0099'} size={25}/>
                    <MainContent.text>{offers.three}</MainContent.text>
                </MainContent.row>
            </MainContent>
            <ButtonBox>
                <ButtonPlan onPress={removeSubscription}>
                    Cancelar Assinatura
                </ButtonPlan> 
            </ButtonBox>             
        </Slider>
    )

    function removeSubscription(){
        props.removeSubscription()
    }
}