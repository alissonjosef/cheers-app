import { View, Text } from 'react-native'
import React from 'react';

import {LogoContainer} from './style'; 
import Logo from '../../assets/svg/Vertical-Neon.svg';

 const LogoCheers = ({title,subtitle}) => {
  return (
    <LogoContainer>
        <LogoContainer.card>
            <Logo height={190} width={150}/>
        </LogoContainer.card >
        <LogoContainer.title>{title}</LogoContainer.title>
        <LogoContainer.subtitle>{subtitle}</LogoContainer.subtitle>
    </LogoContainer>
  )
}

export default LogoCheers;