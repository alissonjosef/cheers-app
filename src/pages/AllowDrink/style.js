import styled from 'styled-components/native';

export const HeaderSection = styled.View`
    flex:2;
    justify-content:center;
    align-items:center;
    width:100%;
`; 

export const MainSection = styled.View`
    flex:2;
    justify-content:center;
    width:100%;
    margin-bottom:5%;
`; 


export const FooterSection = styled.View`
    flex:2;
    padding:15%;
    align-items:center;
    width:100%;
`; 

export const Title = styled.Text`
    font-family:Quicksand-Medium;
    font-size: 25px; 
    color:#40E0D0; 
`; 


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

export const ImageContainer =  styled.View`
    width:80%;
    justify-content:center;
    align-self:center;
    padding:10%;
`; 