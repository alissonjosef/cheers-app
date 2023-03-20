import React, { useState } from 'react'
import { Text, View, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native'
import { TextInput, Button, Snackbar, HelperText } from 'react-native-paper';

import { BackgroundImageCheers } from '../../global/style';
import { Container } from './style'

import LogoCheers from '../../components/LogoCheers/';
import SocialMedia from '../../components/SocialMedia/';
import PerTextInput from '../../components/TextInput/';
import AvatarUser from '../../components/UserAvatar/';

import api from '../../services/api';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import Loading from '../../components/Loading';
import { useNavigation } from '@react-navigation/native';

const Recover = ({route}) => {
  const navigation = useNavigation()
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const [withError, setWithError] = useState([]);
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('Obrigátorio preencher todos os campos')

  const cleanState = () => {
    setPassword('')
  }

  const register = async () => {
    if (checkData()) {
      let data = {
        email: String(route.params.email),
        password: password,
      }

      console.log(data, route.params.passwordKey)
      setIsLoading(true)
      api.post(`/resetPasswordUser/${route.params.passwordKey}`, data).then(res => {
        cleanState();
        setIsLoading(true)
        navigation.navigate('LoginArea')
        setIsLoading(false)
      })
        .catch(error => {
          console.log("🚀 ~ file: index.js:48 ~ register ~ error", error)
          if (!error.response && error.toString().includes('Network Error')) {
            setError(true);
            return setErrorMessage("Erro ao se comunicar com o servidor!")
          }
          if (error.response.status == 303) {
            setError(true);
            setErrorMessage("Senha já está em uso!")
            setWithError(['senha'])
          }
          return setIsLoading(false)
        }
        )
    }
  }

  const checkData = () => {
    Keyboard.dismiss()
    const errors = []
    setError(false)


    if ((password.length > 0 && password.length < 6) || passwordConfirm != password || password.length === 0)
      errors.push('password')

    if (passwordConfirm != password) {
      setError(true)
      setErrorMessage('Senhas não conferem.')
    }
    if (password.length > 0 && password.length < 6) {
      setError(true)
      setErrorMessage('A senha deve ter no mínimo 6 caracteres.')
    }

    if (password.length === 0) {
      setError(true)
      setErrorMessage('Obrigátorio preencher todos os campos')
    }

    setWithError(errors)

    if (errors.length == 0)
      return true
    return false

  }


  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      {isLoading ?
        <BackgroundImageCheers><Loading /></BackgroundImageCheers> :
        <BackgroundImageCheers>

          <LogoCheers
            title={'Bem-vindo a Cheers'}
            subtitle={'Digite sua nova senha.'}
          />
          <HelperText type="error" visible={error}>
            {errorMessage}
          </HelperText>
          <Container>
            <Container.card>
              <PerTextInput
                error={withError.includes('password')}
                value={password} secureTextEntry placeholder={'Digite sua senha'} onChangeText={(password) => setPassword(password)} />
            </Container.card>
            <Container.card style={{ marginTop: 8 }}>
              <PerTextInput
                error={withError.includes('password')}
                value={passwordConfirm} secureTextEntry placeholder={'Confirme sua senha'} onChangeText={(password) => setPasswordConfirm(password)} />
            </Container.card>

            <Button onPress={register} mode="contained" color="#FF0099" style={{ padding: 5, marginTop: 15 }} labelStyle={{ fontSize: 15 }}>
              Salvar
            </Button>
          </Container>

        </BackgroundImageCheers>}
    </TouchableWithoutFeedback>

  )

}

export default Recover;
