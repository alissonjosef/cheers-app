import React, {Component} from 'react'
import {Main , ButtonAccept,Container,style} from  '../../global/style';
import {View,Text,ImageBackground,PermissionsAndroid } from 'react-native';
import BG3 from '../../assets/img/BG3.jpg'; 

import { setUserFristTimeInApp } from '../../services/termService';

import {requestNotifications} from 'react-native-permissions';


const Allow = ({navigation}) => {

    const askForNotification = async () => {
        try {
            console.log(PermissionsAndroid.PERMISSIONS)
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                {
                  'title': 'Cheers',
                  'message': '',
                  'buttonPositive': "OK"
                }
              )
              if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Sem acesso a Localização")
            } 
        } catch (err) {
            console.warn(err)
        }
        
    }

    const insertTerms = async () => {
        setUserFristTimeInApp({userInApp:true});
        requestNotifications(['alert', 'sound']).then(({status, settings}) => {
            // não há regra sobre status de permissão portanto sempre vai para proxima tela 
            navigation.navigate('TabsMain'); 
        });
    }


    return (
        <Container>           
            <ImageBackground source={BG3} resizeMode="cover" style={style.image}>
                <Main.Container>
                    <Main.header>
                            <Main.Title>Bem-vindo</Main.Title>
                        <Main.SubTitle>Nunca foi tão facil beber um drink gratís por dia todos os dias</Main.SubTitle>
                    </Main.header>

                    <Main.section>
                            <Main.Title color={'#40E0D0'}>Permitir notificações</Main.Title>
                        <Main.SubTitle>para acompanhar novos drinks, bares e restaurantes</Main.SubTitle>
                    </Main.section>
                
                    <Main.footer>
                        <ButtonAccept onPress={insertTerms}>
                            <View>
                                <Text style={{color:'#170028'}}>Permitir</Text>
                            </View>                              
                        </ButtonAccept> 
                    </Main.footer>                  
                </Main.Container>
            </ImageBackground>
        </Container>
    ); 
    
}

export default Allow; 

