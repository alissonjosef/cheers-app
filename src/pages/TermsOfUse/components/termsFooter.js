import React from 'react';
import { View,Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { ButtonAccept } from '../../../global/style';

const FooterTerms = () => {

  const navigation = useNavigation(); 

  const acceptTerms = () => {navigation.navigate('Location')}

  return (
    <ButtonAccept onPress={acceptTerms}>
        <View>
           <Text style={{color:'#170028'}}>Aceitar os termos de uso</Text>
        </View>      
    </ButtonAccept>
    );
}

export default FooterTerms;