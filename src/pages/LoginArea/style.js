import styled from "styled-components/native"
import MenuLogoImage from '../../assets/img/BG-Menu.jpg';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Pressable } from "react-native";


export const Row = styled.View`  
    flex-direction:row;  
    justify-content:space-around;
    align-self:center;
    width:90%;  
`
export const MenuLogo = styled.ImageBackground.attrs({
    source:MenuLogoImage
})`
    padding-top:${hp('2%')}px;
    width:100%
`;

export const Title  = styled.Text`
   color: #40E0D0;
   font-size:17px; 
   font-family:Quicksand-Medium; 
`

export const Main = styled.View`
    margin-top:${hp('5%')}px;
    width:100%;
    flex:1;
`



export const OptionContariner = styled.View`
    flex:3; 
    width:100%;
`;

export const OptionCard = styled.View`
    flex-direction:row;     
    width:100%; 
    background-color:red;
`

OptionCard.cardLeft = styled.View`
flex-direction:row;     
`

OptionCard.cardRight = styled.View`
   align-itens:flex-end;
`


