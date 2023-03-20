import React, {Component, useEffect} from 'react'
import {Main , ButtonAccept,Container} from  '../../global/style';
import {View,Text,ImageBackground, StyleSheet, PermissionsAndroid } from 'react-native';
import BG2 from '../../assets/img/BG2.jpg'; 
  
import {isIOS} from '../../Util/commos'; 
import Geolocation from 'react-native-geolocation-service';

const style = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center" ,
        alignItems:'center'
    }
   
})

const Location = ({navigation}) => {
    
    useEffect(()=> {
        if(isIOS) { 
            askForLocatioInIos(); 
        }
    },[])

    const askForLocation = async () => {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                'title': 'Cheers',
                'message': 'Ative a localização para buscar os bares no mapa!',
                'buttonPositive': "OK"
              }
            )
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
              console.log("Sem acesso a Localização")
            } 
            
            navigation.navigate('TabsMain')
            
          } catch (err) {
            console.warn(err)
        }
        
    }

    const askForLocatioInIos = async () => {
        try {
            Geolocation.requestAuthorization("whenInUse");
          } catch (err) {
            console.log(err)
        }
        
    }
    

    return (
        <Container>           
            <ImageBackground source={BG2} resizeMode="cover" style={style.image}>
                <Main.Container>
                    <Main.header>
                            <Main.Title>Bem-vindo</Main.Title>
                        <Main.SubTitle>Nunca foi tão facil beber um drink gratís por dia todos os dias</Main.SubTitle>
                    </Main.header>

                    <Main.section>
                            <Main.Title color={'#40E0D0'}>Ative sua localização</Main.Title>
                        <Main.SubTitle>Ative sua localização para encontrar os melhores bares e restaurantes perto de você</Main.SubTitle>
                    </Main.section>
                
                    <Main.footer>
                        {isIOS ?
                        <ButtonAccept onPress={()=> {navigation.navigate('Allow')}}>
                            <View>
                                <Text style={{color:'#170028'}}>Próximo</Text>
                            </View>                              
                        </ButtonAccept> :
                        <ButtonAccept onPress={askForLocation}>
                         <View>
                             <Text style={{color:'#170028'}}>Ativar minha localização</Text>
                         </View>                              
                        </ButtonAccept>
                        }
                    </Main.footer>                  
                </Main.Container>
            </ImageBackground>
        </Container>
    ); 
}
 
export default Location; 
