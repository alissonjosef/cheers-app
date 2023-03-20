import { Text, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { Component, useState } from 'react'
import { TextInput, Button, HelperText, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogoCheers from '../../components/LogoCheers/';
import SocialMedia from '../../components/SocialMedia/';
import { BackgroundImageCheers } from '../../global/style';
import { Container, ContentButtonForgotPassword, ContentForgotPassword, ContentTitle } from './style'
import api from '../../services/api';
import { CommonActions } from '@react-navigation/native';
import { setUserInfo } from '../../services/loginService';
import Loading from '../../components/Loading';
import PerTextInput from '../../components/TextInput';

const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('Email inválido');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('Senha Inválida!');
  const [isLoading, setIsLoading] = useState(false)
  const { registeredNow } = props.route.params
  const [style, setStyle] = useState(
    {
      color: '#fff'
    }
  );

  const validation = () => {
    setEmailError(false)
    setPasswordError(false)

    if (email == '' || password == '') {
      if (email == '')
        setEmailError(true)
      if (password == '')
        setPasswordError(true)
      return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError(true)
      return false;
    }

    return true;
  }

  const login = async () => {
    let isOkLogin = validation();
    if (isOkLogin) {
      setIsLoading(true)
      api.post('/signinUser', { email: email, password: password })
        .then(res => {
          setIsLoading(false);
          setUserInfo(res.data.result)
          api.defaults.headers.common['Authorization'] = `bearer ${res.data.result.token}`;

          console.log(`bearer ${res.data.result.token}`);

          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'TabsMain',
                  params: {
                    isLogin: true,
                    userData: res.data
                  },
                },
              ],
            })
          )
          api.get('/allFavs/' + userData.id)
            .then(res => {
              if (res.data.success)
                setUserFavs(res.data.results)
            })
        })
        .catch(error => {
          setIsLoading(false)
          if (error.response) {
            if (error.response.status == 400) {
              setEmailError(true);
              setEmailErrorMessage("Usuário/Email não encontrado!");
            }
            if (error.response.status == 401) {
              setPasswordError(true);
              setPasswordErrorMessage("Senha Incorreta!");
            }
          }
          if (!error.response && error.toString().includes("Network Error"))
            Alert.alert("Falha ao se comunicar com o servidor")
        })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <BackgroundImageCheers>
        <LogoCheers
          title={registeredNow ? "Cadastro realizado com sucesso!" : 'Bem-vindo de volta :)'}
          subtitle={'Acesse sua conta para pegar seu drink gratuito.'}
        />
        {isLoading && <Loading />}
        {!isLoading && <Container>
          <Container.card >
            <PerTextInput
              activeOutlineColor={'#FF0099'}
              autoCapitalize={'none'}
              outlineColor={'#FF0099'}
              mode={'outlined'}
              placeholder="Usuário ou e-mail"
              value={email}
              onChangeText={email => setEmail(email)}
              style={{ backgroundColor: 'rgba(34,36,40,0.1)', fontSize: 12 }}
              theme={{ colors: { placeholder: style.color, text: style.color } }}
              error={emailError} />
            <HelperText type="error" visible={emailError}>
              {emailErrorMessage}
            </HelperText>
            <PerTextInput
              activeOutlineColor={'#FF0099'}
              outlineColor={'#FF0099'}
              mode={'outlined'}
              placeholder="Senha"
              value={password}
              secureTextEntry
              onChangeText={password => setPassword(password)}
              style={{ backgroundColor: 'rgba(34,36,40,0.1)', fontSize: 12 }}
              theme={{ colors: { placeholder: style.color, text: style.color } }}
              error={passwordError} />
            <HelperText type="error" visible={passwordError}>
              {passwordErrorMessage}
            </HelperText>
          </Container.card>
          

          <ContentForgotPassword>
            <ContentButtonForgotPassword onPress={() => {
              props.navigation.navigate('RecuperarSenha');
            }}>
              <ContentTitle>Recuperar senha</ContentTitle>
            </ContentButtonForgotPassword>
          </ContentForgotPassword>

          <Button mode="contained" color="#FF0099" style={{ padding: 5 }} labelStyle={{ fontSize: 15 }} onPress={login}>
            Entrar
          </Button>
          {/* <SocialMedia name={'Ou entre com'}/> */}
        </Container>}
      </BackgroundImageCheers>
    </TouchableWithoutFeedback>

  )


}

export default Login;