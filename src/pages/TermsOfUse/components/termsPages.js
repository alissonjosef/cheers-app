import React from 'react';
import { View,Text } from 'react-native';

import { ParagraphTitle, Paragraph } from './style';

const Pages = ({item}) => {
  return (
    <View>
        <ParagraphTitle>{item.p1Title}</ParagraphTitle>
        <Paragraph>{item.p1}</Paragraph>
        <ParagraphTitle>{item.p2Title}</ParagraphTitle>
        <Paragraph>{item.p2}</Paragraph>
        <ParagraphTitle>{item.p3Title}</ParagraphTitle>
        <Paragraph>{item.p3}</Paragraph>
    </View>
  );
}

export default Pages;