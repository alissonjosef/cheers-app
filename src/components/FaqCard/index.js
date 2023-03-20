import React, { useState, useEffect } from 'react';
import {View,Text} from 'react-native';
import { HelperText, Divider} from 'react-native-paper';

import {Card,Title} from './style'

function FaqCard ({title,content,top = false}) {
    return(
        <>
         {top && <Divider style={{backgroundColor:'#fff'}}/>}
         <Card>
            <Title>{title}</Title>
            <Title.subtitle>{content}</Title.subtitle>
         </Card>  
         <Divider style={{backgroundColor:'#fff'}}/>
        </>
     
    )
}

export default FaqCard