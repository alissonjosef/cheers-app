import React, {useEffect, useState} from 'react'
import {Main , ButtonAccept,Container} from  '../../global/style';
import {View,Text,ImageBackground, StyleSheet } from 'react-native';

import BG1 from '../../assets/img/BG1.jpg'; 
import BG2 from '../../assets/img/Background.jpg'; 
import Terms from './components/termsOfUse';


const style = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center" ,
        alignItems:'center'
    }
   
})

const TermsOfUse = ({navigation}) => {

    const [allowTerms,setAllowTerms] = useState(true); 

    const discorverAllow = () => setAllowTerms(!allowTerms); 
   
    return (
        <Container>           
            <ImageBackground source={allowTerms ? BG1 : BG2} resizeMode="cover" style={style.image}>
                <Main.Container allowTerms>
                { allowTerms ?( 
                    <>
                        <Main.header>
                                <Main.Title>Bem-vindo</Main.Title>
                            <Main.SubTitle>Nunca foi tão facil beber um drink gratís por dia todos os dias</Main.SubTitle>
                        </Main.header>

                        <Main.section>
                                <Main.Title color={'#40E0D0'}>Aceitar os termos de uso</Main.Title>
                            <Main.SubTitle>Aceite os termos de uso do aplicativo para poder utiliza-lo</Main.SubTitle>
                        </Main.section>
                    
                        <Main.footer>
                            <ButtonAccept onPress={discorverAllow}>
                                <View>
                                    <Text style={{color:'#170028'}}>Ler termos de uso </Text>
                                </View>                              
                            </ButtonAccept> 
                        </Main.footer>
                    </>
                    ) : <Terms/>}
                        
                </Main.Container>
            </ImageBackground>
          
        </Container>
    ); 
    
}

export default TermsOfUse
