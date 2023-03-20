import styled from 'styled-components/native'; 
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { colors } from '../../../global/colors';

export const Title = styled.Text`
    font-size:${hp('2.5%')}px;
    color:${colors.white}; 
    text-align:center; 
    font-family:Quicksand-Bold;
`; 

export const SubTitle = styled.Text`
    font-size:${hp('1.5%')}px;
    color:${colors.white}; 
    text-align:left; 
    font-family:Quicksand-Medium;
`; 

export const Introduction = styled.Text`
    font-size:${hp('1.5%')}px;
    color:${colors.white}; 
    text-align:left; 
    font-family:Quicksand-Regular;
`; 




export const ParagraphTitle = styled.Text`
    font-size:${hp('2%')}px;
    color:${colors.pink}; 
    text-align:left; 
    font-family:Quicksand-Bold;
    text-decoration-line:underline;
`; 


export const Paragraph = styled.Text`
    font-size:${hp('1.5%')}px;
    color:${colors.white}; 
    text-align:left; 
    font-family:Quicksand-Regular;
`; 