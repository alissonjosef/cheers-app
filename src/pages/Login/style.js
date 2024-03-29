import { Pressable } from 'react-native';
import styled from 'styled-components/native';


export const Container = styled.View`
    margin-top:5%;
    width:90%;
`;

Container.card = styled.View`
    margin-bottom:3%;
`;

export const ContentForgotPassword = styled.View`
width: 100%;
padding: 5px 2px;
margin-bottom: 15px;
align-items: flex-end;
justify-content: flex-end;
`
export const ContentButtonForgotPassword = styled(Pressable)`
justify-content: flex-end;
`;

export const ContentTitle = styled.Text`
align-items: flex-end;
font-size: 17px;
color: white;
`;