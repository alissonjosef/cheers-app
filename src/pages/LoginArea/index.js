import React, { Component, useEffect, useState } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { BackgroundImage } from '../../global/style'
import {
  Row,
  MenuLogo,
  Main,
  Title,
  OptionContariner,
  ContentForgotPassword,
  ContentButtonForgotPassword,
  ContentTitle,
} from './style';

import { ActivityIndicator, Button } from 'react-native-paper';

import AvatarUser from '../../components/UserAvatar/';
import Option from '../../components/OptionLogin/';

import Logo from '../../assets/svg/Vertical-Neon.svg';
import Dolar from '../../assets/svg/dolar.svg';
import Exit from '../../assets/svg/exit.svg';
import Fac from '../../assets/svg/fac.svg';
import Hand from '../../assets/svg/hand.svg';
import Heart from '../../assets/svg/heart.svg';

import api from '../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo, LogoutUser, updateUserInfo } from '../../services/loginService';
import { CommonActions } from '@react-navigation/native';
import Loading from '../../components/Loading';


//componentes
import Swiper from './components/Swiper';



const LoginArea = (props) => {
  const [userData, setUserData] = useState(null)
  const [isLogged, setIsLogged] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    importData()
  }, [])

  async function importData() {
    try {
      setIsLoading(true)
      await updateUserInfo()
      const tempData = await getUserInfo()
      if (tempData != null) {
        setUserData(tempData)
        setIsLogged(true)
      }
      setIsLoading(false)
    } catch (error) {
      if (error.toString().includes("Network Error"))
        Alert.alert("Falha ao se comunicar com o servidor")
      LogoutUser()
      setIsLogged(false)
      setIsLoading(false)
    }


  }
  function Logout() {
    LogoutUser()
    setIsLogged(false)
  }

  return (

    <BackgroundImage>
      {isLoading && <Loading />}
      {!isLoading && <>
        {isLogged ?
          <MenuLogo>
            <View style={{ marginLeft: 20 }}>
              <AvatarUser userData={userData} />
            </View>
          </MenuLogo> :
          <MenuLogo>
            <View style={{ marginLeft: 20 }}>
              <Logo height={90} width={80} />
            </View>
          </MenuLogo>
        }

        {!isLoading && isLogged ? <></> :
          <Main>
            <View style={{ marginBottom: 20, marginLeft: 20 }}>
              <Title>
                Um drink grátis por{'\n'} dia, todos os dias!
              </Title>
            </View>
            <Row>
              <Button color="#FF0099" style={{ width: '50%' }} mode="contained" onPress={() => { props.navigation.push('Login', {}) }}>
                Entrar
              </Button>
              <Button color="#FF0099" mode="outlined" style={{ borderWidth: 1, borderColor: '#FF0099' }} onPress={() => props.navigation.push('Cadastro')}>
                Cadastrar-se
              </Button>
            </Row>

           
          </Main>}

        <OptionContariner>
          <ScrollView>
            <Option
              icon={<Dolar height={30} width={30} />}
              title={'Planos'}
              fun={() => { props.navigation.push('Planos') }}
            />
            <Option
              icon={<Fac height={30} width={30} />}
              title={'Ajuda'}
              fun={() => { props.navigation.push('Ajuda') }}
            />
            <Option
              icon={<Heart height={30} width={30} />}
              title={'Favoritos'}
              fun={() => { props.navigation.push('Favoritos') }}
            />
            {isLogged && <Option
              icon={<Exit height={30} width={30} />}
              title={'Sair'}
              fun={() => { Logout() }}

            />}

          </ScrollView>
          {isLogged && <View style={{
            flex: 1,
            alignItems: 'center',
          }}>

            <Swiper
              logOut={Logout}
            />
          </View>}


        </OptionContariner>

      </>}
    </BackgroundImage>

  )
}


export default LoginArea;