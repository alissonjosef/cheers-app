import styled from 'styled-components/native'

export const BanerContainer = styled.View`
  width:100%;
  height:30%;
`;

BanerContainer.Row = styled.View`
  flex-direction:row; 
  justify-content:space-between;
`;

BanerContainer.Item = styled.View`
    padding:1%; 
   
`;

BanerContainer.footer =  styled.View`
    flex:1;
    width:90%;
    justify-content:flex-end; 
    margin-bottom:16%; 
`;

BanerContainer.section =  styled.View`
    flex:1;
    width:100%;
    justify-content:center;
`;

export const ListFlat = styled.FlatList.attrs({
    contentContainerSyle:{paddingHorizontal:5},
    showsVerticalScrollIndicator:false,
  })`
`;

export const ViewList = styled.View`
  margin:4%;
  width:100%;
`;


export const SectionTitle = styled.Text`
  font-family:Quicksand-Medium;
  font-size: 16px; 
  color:#FFFFFF;
  text-align:center;
  padding:2%;
`; 

export const ButtonAccept = styled.Pressable`
    justify-content:center; 
    align-items: center;
    background-color: ${props => props.color || '#00FEC5'}; 
    padding:6%; 
    margin:5%;
    border-radius:5px;
`; 

ButtonAccept.text =  styled.Text`
    font-family:Quicksand-Medium;
    font-size:17px;
    color: #FFF;
`;

export const ContainerSwiper = styled.View`
  flex:1; 
  align-items:center;
`;

ContainerSwiper.box = styled.View`
  width:90%;
  padding:2%;

`;

ContainerSwiper.Cardbox = styled.View`
  margin-bottom:10%; 
`;

ContainerSwiper.Text = styled.Text`
  font-family:Quicksand-Medium;
  font-size:${props=> props.size || '15px'};
  color: #FFF;
`; 

ContainerSwiper.TextLoc = styled.Text`
  font-family:Quicksand-Medium;
  font-size:15px;
  color: #FFF;
`; 

export const ListText = styled.Text`
  font-family:Quicksand-Medium;
  font-size:10px;
  text-align:center;
  color:#fff;
`;

export const ListDays = styled.Text`
  font-family:Quicksand-Medium;
  font-size:15px;
  text-align:center;
  color:#fff;
`;