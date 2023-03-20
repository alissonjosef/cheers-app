import styled from 'styled-components/native';

export const ContainerSwiper = styled.View`
  flex:1; 
  align-items:center;
`;

ContainerSwiper.box = styled.View`
  width:90%;
  align-items:center;
  padding-top:10%;
`;

ContainerSwiper.card = styled.View`
    margin-bottom:10%;
`;

ContainerSwiper.Text = styled.Text`
    font-family:Quicksand-Medium;
    font-size: ${props => props.size || '22px'}; 
    color:#fff; 
    text-align:center;
`;