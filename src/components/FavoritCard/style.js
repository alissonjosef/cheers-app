import styled from 'styled-components/native';

export const Card = styled.View`
    width:100%; 
    padding:4%;
`;

export const Title = styled.Text`
    font-size: ${props => props.size || '15px'};
    font-family:Quicksand-Regular;
    color:#ff0099;
`;

Title.subtitle = styled.Text`
    font-size: ${props => props.size || '12px'};
    font-family:Quicksand-Regular;
    color:#F4F4F2;
`;

export const ButtonFavoritar = styled.TouchableOpacity`

    
`;