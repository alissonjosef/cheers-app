import styled from 'styled-components/native';

export const Row = styled.View`
    flex-direction:row;
    
`

Row.item = styled.View`
    flex:1;
`

Row.itemText = styled.View`
    flex:1;
    justify-content:center;
    align-self:center;
`

Row.button = styled.Pressable`
    padding-horizontal:2%;
`

export const Container = styled.View`
    margin-top:5%;
`;