import React, { useState } from 'react'
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { BackgroundImageCheers } from '../../global/style';
import PerTextInput from '../../components/TextInput/';
import LogoCheers from '../../components/LogoCheers/';

import { Container, ContentFooter, ButtonGoBack, Title1, Title2 } from './style'
import { Button, HelperText } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Loading from '../../components/Loading';


const CodeRecover = ({ route }) => {
    const navigation = useNavigation()
    const [codigo, setCodigo] = useState('');
    const [withError, setWithError] = useState([]);
    const [error, setError] = useState(false)
    const [codigoError, setCodigoError] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [codigoErrorMessage, setCodigoErrorMessage] = useState('Codigo inválido');
    const [errorMessage, setErrorMessage] = useState('Obrigátorio preencher o campo')

    const cleanState = () => {
        setCodigo('')
    }


    const register = async () => {
        if (checkData()) {
            const emailPassword = route.params.email
            let data = { email: String(route.params.email), passwordKey: codigo }
            console.log(data)
            setIsLoading(true)
            api.post('/codeUser', data)
                .then(response => {
                    if (response.data.valido == true) {
                        cleanState();
                        navigation.navigate('Recuperar', { passwordKey: codigo, email: emailPassword })
                        setIsLoading(false)
                    } else {
                        setIsLoading(false)
                        setError(true);
                        setErrorMessage("Código inválido!")
                        setWithError(['codigo'])
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status == 400) {
                            setCodigoError(true);
                            setCodigoErrorMessage('Código invalido!');
                        }
                    }
                    if (!error.response && error.toString().includes('Network Error')) {
                        setError(true);
                        return setErrorMessage("Erro ao se comunicar com o servidor!")
                    }
                    if (error.response.status == 303) {
                        setError(true);
                        setErrorMessage("Código invalido!")
                        setWithError(['codigo'])
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


        if (codigo.length === 0) {
            errors.push('codigo')
            setError(true)
            setErrorMessage('Código inválido')
        }
        if (codigo.length === 0) {
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
                        subtitle={'Digite o código para recuperar sua senha.'}
                    />
                    <HelperText type="error" visible={error}>
                        {errorMessage}
                    </HelperText>
                    <Container>
                        <Container.card >
                            <PerTextInput
                                error={withError.includes('Codigo')}
                                value={codigo} placeholder={'Código'} onChangeText={(codigo) => setCodigo(codigo)} />
                        </Container.card>
                        <HelperText type="error" visible={codigoError}>
                            {codigoErrorMessage}
                        </HelperText>

                        <Button onPress={register} mode="contained" color="#FF0099" style={{ padding: 5, marginTop: 17 }} labelStyle={{ fontSize: 15 }}>
                            Verificar Código
                        </Button>

                    </Container>
                </BackgroundImageCheers>}
        </TouchableWithoutFeedback>

    )

}

export default CodeRecover;
