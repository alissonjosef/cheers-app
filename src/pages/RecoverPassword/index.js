import React, { useState } from 'react'
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { BackgroundImageCheers } from '../../global/style';
import PerTextInput from '../../components/TextInput/';
import LogoCheers from '../../components/LogoCheers/';

import { Container, ContentFooter, ButtonGoBack, Title1, Title2 } from './styles'
import { Button, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Loading from '../../components/Loading';
import { CommonActions } from '@react-navigation/native';


const RecoverPassword = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [withError, setWithError] = useState([]);
    const [error, setError] = useState(false)
    const [emailError, setEmailError] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [emailErrorMessage, setEmailErrorMessage] = useState('Email inválido');
    const [errorMessage, setErrorMessage] = useState('Obrigátorio preencher o campo')

    const cleanState = () => {
        setEmail('')
    }

    const register = async () => {
        if (checkData()) {
            let data = { email: email.toLowerCase().trim() }
            console.log(data)
            setIsLoading(true)
            api
                .post('/forgotPasswordUser', data)
                .then(res => {
                    cleanState()
                    navigation.navigate('CodigoRecuperacao', { email: email })
                    setIsLoading(false)
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status == 400) {
                            setEmailError(true);
                            setEmailErrorMessage('Usuário/Email não encontrado!');
                        }
                    }
                    if (!error.response && error.toString().includes('Network Error')) {
                        setError(true);
                        return setErrorMessage("Erro ao se comunicar com o servidor!")
                    }
                    if (error.response.status == 303) {
                        setError(true);
                        setErrorMessage("Email não cadastrado!")
                        setWithError(['email'])
                    }
                    return setIsLoading(false)
                }
                )
        }

    }

    const handlerBackLogin = () => {
        navigation.dispatch(CommonActions.goBack());
    }

    const checkData = () => {
        Keyboard.dismiss()
        const errors = []
        setError(false)


        if (email.length === 0 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            errors.push('email')
            setError(true)
            setErrorMessage('Email inválido')
        }
        if (email.length === 0) {
            setError(true)
            setErrorMessage('Obrigátorio preencher o campos')
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
                        subtitle={'Digite seu email para recuperar sua senha.'}
                    />
                    <HelperText type="error" visible={error}>
                        {errorMessage}
                    </HelperText>
                    <Container>
                        <Container.card >
                            <PerTextInput
                                error={emailError}
                                value={email} placeholder={'Seu e-mail'} onChangeText={(email) => setEmail(email)} />
                        </Container.card>
                        <HelperText type="error" visible={emailError}>
                            {emailErrorMessage}
                        </HelperText>

                        <Button onPress={register} mode="contained" color="#FF0099" style={{ padding: 5, marginTop: 17 }} labelStyle={{ fontSize: 15 }}>
                            Recuperar
                        </Button>

                        <ContentFooter>
                            <ButtonGoBack onPress={handlerBackLogin}>
                                <Title1>Não quero recuperar senha?</Title1>
                                <Title2>Voltar ao login</Title2>
                            </ButtonGoBack>
                        </ContentFooter>
                    </Container>
                </BackgroundImageCheers>}

        </TouchableWithoutFeedback>

    )

}

export default RecoverPassword;
