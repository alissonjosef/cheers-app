import React, { useState } from 'react'
import { Text, View, TouchableWithoutFeedback,Keyboard,ScrollView,Alert} from 'react-native'
import { TextInput , HelperText ,Button, Snackbar } from 'react-native-paper';

import {BackgroundImageCheers} from '../../global/style';
import {Container} from './style'

import LogoCheers from '../../components/LogoCheers/';
import SocialMedia from '../../components/SocialMedia/';
import PerTextInput from '../../components/TextInput/';
import AvatarUser from '../../components/UserAvatar/'; 

import api from  '../../services/api';
import { CommonActions } from '@react-navigation/native';


const Login = (props) => {

  const [email,setEmail] = useState(''); 
  const [password,setPassword] = useState(''); 
  const [passwordConfirm,setPasswordConfirm] = useState(''); 
  const [name,setName] = useState(''); 
  const [idade,setIdade] = useState(''); 
  const [isLogin,setIsLogin] = useState(false); 
  const [visible, setVisible] = useState(false);
  const [withError,setWithError] = useState([]);

  const [error,setError] = useState(false)
  const [errorMessage,setErrorMessage] = useState('Obrigátorio preencher todos os campos')

  const cleanState = () => {
    setEmail('')
    setPassword('')
    setPasswordConfirm('')
    setName('')
    setIdade('')
  }
 
  const register = async () => {
    if(checkData()){
      let data = {
        email:email.toLowerCase().trim(), 
        password:password,
        name:name, 
        age:idade      
      }
  
      api.post('/signupUser',data).then(res => {
          setVisible(true)
          cleanState(); 
          props.navigation.dispatch(
            CommonActions.navigate({
                name:'Login',
                params: {
                  registeredNow:true,
                }
            }) ) 
        })
      .catch(error => {
        if(!error.response && error.toString().includes('Network Error')) 
          Alert.alert("Falha ao se comunicar com o servidor")
        if(error.response.status == 303){
          setError(true);
          setErrorMessage("Esse email já está em uso!")
          setWithError(['email'])
        }
      }
      )
    }

      
    
  }

  const checkData = () => {
    const errors = [];
    
    setError(false)

    
    if(name.length === 0)
      errors.push('name')
    if(idade.length === 0 || idade < 18)
      errors.push('idade')
    if((password.length > 0 && password.length < 6 ) || passwordConfirm != password || password.length === 0)
      errors.push('password')
    

    if (password.length > 0 && password.length < 6) {
      setError(true)
      setErrorMessage('A senha deve ter no mínimo 6 caracteres.')
    }

    if (passwordConfirm != password) {
      setError(true)
      setErrorMessage('Senhas não conferem.')
    }
    if (name.length === 0 || idade.length === 0 || email.length === 0 || password.length === 0) {
      setError(true)  
      setErrorMessage('Obrigátorio preencher todos os campos')
    }
    if(email.length === 0 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      errors.push('email')
      setError(true)
      setErrorMessage('Email inválido')
    }

    if(idade < 18){
      setError(true)
      setErrorMessage("Você precisa ser maior de 18 para assinar o aplicativo!")
    }
    setWithError(errors)

    if(errors.length == 0)
      return true
    return false
  }

  const idadeAdapter = (text) => {
    setIdade(text.replace(/[^0-9]/g, ''));
  }

  const onDismissSnackBar = () => setVisible(false);

  return (     
      <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
      <BackgroundImageCheers>
          
          <LogoCheers 
            title={'Bem-vindo a Cheers'}
            subtitle={'Crie uma conta para continuar.'}
          />
          <HelperText type="error" visible={error}>
                {errorMessage}
          </HelperText>
          <Container>        
              <Container.card>
                <Container.row>
                  <View style={{flex:1,paddingRight:10}}>
                    <PerTextInput
                     error={withError.includes('name')}
                     value={name} placeholder={'Seu nome'} onChangeText={(name) => {setName(name)}}/>
                  </View>
                  <View style={{flex:1}}>
                    <PerTextInput 
                    error={withError.includes('idade')}
                    keyboardType='numeric'
                    maxLength={2}
                    value={idade} placeholder={'Sua idade'} onChangeText={(idade) => idadeAdapter(idade)}/>
                  </View>
                </Container.row> 
              </Container.card>
              <Container.card>
                <PerTextInput 
                  autoCapitalize={'none'}
                  error={withError.includes('email')}
                  value={email} placeholder={'Seu e-mail'} 
                  onChangeText={(email) => setEmail(email)}
                />
              </Container.card>  
              <Container.card>
                <PerTextInput 
                error={withError.includes('password')}
                value={password} secureTextEntry placeholder={'Digite sua senha'} onChangeText={(password)=> setPassword(password)}/>
              </Container.card>  
              <Container.card>
                <PerTextInput 
                error={withError.includes('password')}
                value={passwordConfirm} secureTextEntry placeholder={'Confirme sua senha'} onChangeText={(password)=> setPasswordConfirm(password)}/>
              </Container.card> 
                        
            <Button onPress={register} mode="contained" color="#FF0099" style={{padding:5}} labelStyle={{fontSize:15}}>
              Criar conta
            </Button> 

            <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={{
                label: 'Ok',
                onPress: () => {
                  props.navigation.navigate('Login');
                },
            }}>
                Cadastro Realizado com sucesso!!
            </Snackbar>
          </Container>
          
      </BackgroundImageCheers>
      </TouchableWithoutFeedback>
    
  )
  
}

export default Login;