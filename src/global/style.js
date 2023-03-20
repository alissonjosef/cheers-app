import styled from 'styled-components/native'; 
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native'; 

import Background from '../assets/img/Background.jpg';
import BackgroundCheers from '../assets/img/backgroundCheers.jpg';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Container = styled.View`
    flex:1;
    width:100%;
`;

export const Main = styled(LinearGradient).attrs({
    colors: ['#170028','rgba(255, 0, 153, 0.5)'],
    start: { x:0.3, y:0.1},
    end: { x:0.1, y: 0},
   })`
    flex:1;
    justify-content:center; 
    align-items: center;
`;

Main.Container = styled.View`
    width: ${props => props.allowTerms ? '95%' : '80%'};
    height:90%;
`;

Main.header =  styled.View`
    flex:6
`;

Main.section =  styled.View`
    flex:3;
    justify-content:center; 
    align-items: center;
`;

Main.footer =  styled.View`
    flex:1;
    justify-content:flex-end; 
`;

Main.Title = styled.Text`
    text-align: center; 
    color:${props => props.color  ? props.color : '#FF0099'};
    font-size:20px; 
    font-family:Quicksand-Bold;
    padding:5%;
`;



Main.SubTitle = styled.Text`
    text-align: center; 
    color:${props => props.color ? props.color : '#F4F4F2'};
    font-size:17px; 
    font-family:Quicksand-Medium;
    padding:5%;
`;

export const ButtonAccept = styled.Pressable`
    justify-content:center; 
    align-items: center;
    background-color: ${props => props.color || '#00FEC5'}; 
    padding:3%; 
    border-radius:10px;
`; 

ButtonAccept.text =  styled.Text`
    font-family:Quicksand-Medium;
    font-size:15px;
    color: #170028;
`;
 
export const style = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center" ,
        alignItems:'center'
    }
   
})

export const TitleBar = styled.Text`
    font-family:Quicksand-Medium;
    font-size:${props => props.size || '25px'}; 
    color:${props => props.color || '#40E0D0'}; 
    margin-left: 20px;
`; 


export const SubTitleBar   = styled.Text`
    font-family:Quicksand-Medium;
    font-size: 9px; 
    color:#FFFFFF;   
    margin-left: 20px;
`;

export const BackgroundImage = styled.ImageBackground.attrs({
    source:Background
})`
    flex:1; 
    align-items:center;
`;

export const BackgroundImageCheers = styled.ImageBackground.attrs({
    source:BackgroundCheers
})`
    flex:1; 
    align-items:center;
`;

export const ContainerForm = styled.View`
    flex:3; 
    width:100%; 
    align-items:center;
`

ContainerForm.form = styled.View`
    width:90%;
`

export const emptyList = StyleSheet.create({
    text:{
        marginTop:20,
        fontSize:hp('2%'),
        color:'#40E0D0', 
        fontFamily:'Quicksand-Medium',
        textAlign:'center',
    },
})