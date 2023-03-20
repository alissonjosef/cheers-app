import React, { useState } from 'react'; 
import {View,Text,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { Button } from 'react-native-paper';
import {BackgroundImageCheers,ContainerForm} from '../../global/style';
import LogoCheers from '../../components/LogoCheers/';
import PerTextInput from '../../components/TextInput/';

import api from  '../../services/api';

import {success} from '../../Util/commos';

function ContactUs () {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [message,setMessage] = useState('');
    const [disableButton,setDisableButton] = useState(false); 
    const [loading,setLoading] = useState(false); 

    const clearState = () => {
        setName(''); 
        setEmail('');
        setMessage(''); 
    }

    const validationContact = () => {
        
        if(email == '' || email == '' || message == '') {
            return false
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return false; 
        }
      
        return true; 
    
    }

    const sendContact = async () => {

        try {

            const validation = validationContact(); 
            setDisableButton(true);
            setLoading(true); 
           
            if(validation) {
                
                let data = {
                    name:name.toLowerCase().trim(), 
                    email:email.toLowerCase(), 
                    mensagem:message.toLowerCase().trim()
                };             
               
                let response = await api.post('/contact',data)
             
             
                if(response.status == 200) {
                    clearState();
                    success('Mensagem Enviada!!'); 
                    setLoading(false); 
                    return; 
                }
            

            }
            setLoading(false); 
            setDisableButton(false);
            console.log('error')

        } catch(e) {
            setLoading(false); 
            setDisableButton(false);
            console.log(e)
        }
    }


    return (
        <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
            <BackgroundImageCheers>
                <LogoCheers 
                title={'Obrigado por querer \n falar com a Cheers.'}
                />
                <ContainerForm>
                    <ContainerForm.form >
                    <PerTextInput value={name} 
                    placeholder={'Nome'}
                    onChangeText={text => setName(text)}/>
                    
                    <PerTextInput value={email} 
                    placeholder={'E-mail'}
                    onChangeText={text => setEmail(text)}/>
                    
                    <PerTextInput value={message} 
                    placeholder={'Mensagem'}
                    onChangeText={text => setMessage(text)}
                    multi={true}
                    />

                    <View style={{marginTop:10}}>
                        <Button onPress={sendContact} mode="contained" color="#FF0099" style={{padding:5}} labelStyle={{fontSize:15}}>
                            Enviar mensagem
                        </Button> 
                    </View>
                

                    </ContainerForm.form>
                </ContainerForm>

            </BackgroundImageCheers>
        </TouchableWithoutFeedback>
    )
}

export default ContactUs;