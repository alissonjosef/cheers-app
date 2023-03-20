import styled from 'styled-components/native';


export const OptionCard = styled.View`
    flex-direction:row; 
    width:100%; 
    padding-top:5%;
    padding-bottom:7%;
    background-color:#FF00994D; 
`;

OptionCard.cardRight = styled.View`
    flex:1;
    justify-content:center;
    align-itens:center;  
`;

OptionCard.card = styled.View`
   flex:${props => props.flexSize || 1};
   justify-content:center;
   align-itens:center; 
   padding-horizontal:5%;
`;

OptionCard.cardLeft = styled.View`
    flex:1;
    justify-content:flex-start;
    align-itens:flex-start; 
`;

OptionCard.text = styled.Text`
    color:${props => props.color || '#fff'};
    font-size:${props => props.size || '15px'}; 
    font-family:Quicksand-Medium; 
    text-align:left;
`;