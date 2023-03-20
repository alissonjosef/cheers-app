import styled from 'styled-components/native';

export const Container = styled.View`
    width:90%;
    flex:1;
`;

export const HeaderSection = styled.View`
    width:100%;
    justify-content:center;
    flex:1;
`;

export const FaqArea = styled.View`
    width:100%;
    flex:3;
`;

export const ViewFaq = styled.View`
   flex:2;
   margin-bottom:3%;
   align-items:center;

`;
export const TextTitle = styled.Text`
   font-size: ${props => props.size || '20px'};
   font-family:Quicksand-Bold;
   color:#C9C9C9;
   text-align:center;
   margin-bottom:5%;
`;

TextTitle.topicoPergunta = styled.Text`
    font-size: ${props => props.size || '11px'};
    font-family:Quicksand;
    color:#ff0099;
    justify-content:flex-end;
    align-items:flex-end;
 
  
`;
export const TextDetail = styled.Text`
   font-size: ${props => props.size || '10px'};
   font-family:Quicksand-Bold;
   color:#C9C9C9;
   text-align:center;
`;

TextDetail.topicoResposta = styled.Text`
    font-size: ${props => props.size || '9px'};
    font-family:Quicksand;
    color:#C9C9C9;
    width:60%;
    justify-content:center;
    align-items:center;
    margin-top:2%;
 
  
`;

export const ViewTopicos = styled.View`
margin-top:8%;
align-items:flex-start;
`;
