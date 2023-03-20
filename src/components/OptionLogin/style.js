import styled from 'styled-components/native';


export const OptionCard = styled.Pressable`
    flex-direction:row; 
    justify-content:space-between;  
    padding:3%;
    width:100%; 
`;

OptionCard.cardLeft = styled.View`
    flex-direction:row;   
`;

OptionCard.card = styled.View`
    padding-vertical:3%;
    padding-horizontal:5%;
`;

OptionCard.cardRight = styled.View`
   align-itens:flex-end;
   padding-vertical:2%;
`;

OptionCard.text = styled.Text`
    color: #fff;
    font-size:15px; 
    font-family:Quicksand-Medium; 
`;