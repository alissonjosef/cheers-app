import React from 'react';
import { View, Text } from 'react-native';
import { termsHeaderData } from './data';


import { Title, SubTitle, Introduction } from './style';

const Header = () => {

  return (
    <View>
        <Title>{termsHeaderData.title}</Title>
        <SubTitle>{termsHeaderData.subTitle}</SubTitle>
        <Introduction>{termsHeaderData.introduction}</Introduction>
    </View>
  
  );
}

export default Header;