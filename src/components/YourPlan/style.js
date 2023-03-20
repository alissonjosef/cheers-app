import styled from 'styled-components/native'
import { Button } from 'react-native-paper';

export const Slider = styled.View`
    flex:1;
    border-radius:10px;
    border-width:2px;
    padding:5%;
    border-color:#40E0D0;
`;

export const PriceHeader = styled.View`
    flex:1;
    justify-content:center;
`; 

PriceHeader.space = styled.View`
    margin-bottom:4%;
`; 

export const PriceText = styled.Text`
    color:#40E0D0;
    font-family:Quicksand-Bold;
    font-size:26px; 
`;

export const PlanText = styled.Text`
    color:#FF0099;
    font-family:Quicksand-Bold;
    font-size:19px; 
`;

export const MainContent = styled.View`
    flex:2;
    justify-content:center;
`; 

MainContent.row = styled.View`
    flex-direction:row;
    margin-bottom:4%;
`; 

MainContent.text = styled.Text`
    color:#F4F4F2;
    font-family:Quicksand-Regular;
    font-size:13px; 
`; 

export const ButtonBox = styled.View`
    flex:1;

`; 

export const ButtonPlan =  styled(Button).attrs({
    mode:"contained",
    color:"#FF0099",
    style:{padding:5},
    labelStyle:{fontSize:10,fontFamily:'Quicksand-Regular'}
})`

`;