import { View, Text } from 'react-native'
import React from 'react'
import {Divider,Button} from 'react-native-paper';
import {Row,Container} from './style';

import LogoFacebook from '../../assets/svg/facebookLogo.svg';
import GoogleLogo from '../../assets/svg/googleLogo.svg';

const  SocialMedia = ({name,button,fun}) => {
  return (
    <Container>
        <Row>
            <Row.item>
                <View style={{marginTop:10}}>
                    <Divider style={{backgroundColor:'#40E0D0'}}/>
                </View>
            </Row.item>
            <Row.itemText>
                <Text style={{color:'#40E0D0',textAlign:'center'}}>{name}</Text>
            </Row.itemText>
            <Row.item>
                <View style={{marginTop:10}}>
                    <Divider style={{backgroundColor:'#40E0D0'}}/>
                </View>
            </Row.item>
        </Row>
        {button ?
        <View style={{paddingTop:10}}>
            <Button onPress={fun} mode="contained" color="#40E0D0" style={{padding:5}} labelStyle={{fontSize:15}}>
                Já sou um parceiro Cheers
            </Button>
        </View>
        :<Row style={{justifyContent:'center',paddingTop:10}}>
            <Row.button>
                <LogoFacebook
                    height={50} width={50}
                />
            </Row.button>
            <Row.button onPress={()=> true}>
                <GoogleLogo
                    height={50} width={50}
                />
            </Row.button>
        </Row>}
    </Container>

  )
}

export default SocialMedia;
