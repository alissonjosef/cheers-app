import { Text, View, TouchableWithoutFeedback,Keyboard,ScrollView} from 'react-native'
import React, { Component } from 'react'
import { TextInput,Button } from 'react-native-paper';

import {BackgroundImageCheers} from '../../global/style';
import {Container} from './style'

import LogoCheers from '../../components/LogoCheers/';
import SocialMedia from '../../components/SocialMedia/';
import PerTextInput from '../../components/TextInput/';
import AvatarUser from '../../components/UserAvatar/'

class Partner extends Component {
  state = {
    email:'',
    password:'',
    passwordConfirm:'',
    name:'',
    age:'',
    isLogin:false,
  }

  handleNameChange = name => {
    this.setState({name});
  }
  handleAgeChange = age => {
    this.setState({age});
  }
  handleEmailChange = email => {
    this.setState({email});
  }
  handlePassWordChange = password => {
    this.setState({password});
  }
  handlePassWordConfirmChange = passwordConfirm => {
    this.setState({passwordConfirm});
  }

  render() {
    return (
        <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
        <BackgroundImageCheers>

            <LogoCheers
              title={'Bem-vindo a Cheers'}
              subtitle={'Crie uma conta para continuar.'}
            />

            <Container>
                <Container.card>
                  <Container.row>
                    <View style={{flex:1,paddingRight:10}}>
                      <PerTextInput value={this.state.name} placeholder={'Seu nome'} onChangeText={this.handleNameChange}/>
                    </View>
                    <View style={{flex:1}}>
                      <PerTextInput value={this.state.age} placeholder={'Sua Idade'} onChangeText={this.handleAgeChange}/>
                    </View>
                  </Container.row>
                </Container.card>
                <Container.card>
                  <PerTextInput value={this.state.email} placeholder={'Seu e-mail'} onChangeText={this.handleEmailChange}/>
                </Container.card>
                <Container.card>
                  <PerTextInput value={this.state.password} placeholder={'Digite sua senha'} onChangeText={this.handlePassWordChange}/>
                </Container.card>
                <Container.card>
                  <PerTextInput value={this.state.passwordConfirm} placeholder={'Confirme sua senha'} onChangeText={this.handlePassWordConfirmChange}/>
                </Container.card>

              <Button mode="contained" color="#FF0099" style={{padding:5}} labelStyle={{fontSize:15}}>
                Criar conta
              </Button>
              <SocialMedia button name={'ou'}/>
            </Container>

        </BackgroundImageCheers>
        </TouchableWithoutFeedback>

    )
  }
}

export default Partner;
