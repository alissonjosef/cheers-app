import React, { useState, useEffect } from 'react';
import {View,Text} from 'react-native';

import {BackgroundImage} from '../../global/style';
import {Divider} from 'react-native-paper'
import {HeaderSection,OptionArea} from './style';

import Option from '../../components/OptionLogin/';

function Help({navigation}) {
    return (
        <BackgroundImage>
            <Divider style={{backgroundColor:'#fff'}}/>
            <HeaderSection>
                <HeaderSection.text>Saiba como a Cheers{'\n'}pode te ajudar.</HeaderSection.text>
            </HeaderSection>
            <OptionArea>
                <Option
                    top
                    title={'Dúvidas frequentes'}
                    fun={()=> {navigation.push('Dúvidas frequentes')}}
                />
                <Option
                    title={'Fale Conosco'}
                    fun={()=> {navigation.push('Fale Conosco')}}
                />
            </OptionArea>

        </BackgroundImage>
    );
}

export default Help;
