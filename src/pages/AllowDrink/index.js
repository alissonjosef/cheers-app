import React, { useEffect, useState } from 'react';
import {BackgroundImage,TitleBar} from '../../global/style';
import {
HeaderSection,
MainSection,
FooterSection,
ContainerSwiper,
ImageContainer
} from './style';

import { Image, Pressable, View } from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';
import ButtonContainer from '../../components/Button/';


import Aprovado from '../../assets/img/validado.png';
import Aprovar from '../../assets/img/Aprovar.png';
import api from '../../services/api';

const AllowDrink  = (props) => {


    const [panelConfig,setPanelConfig] = useState({
        fullWidth: true,
        onlyLarge: true,
        showCloseButton: false,
        closeOnTouchOutside:true,
        style: {backgroundColor:'#790048',height:'70%'},
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
    })

    const [isPanelActive,setIsPanelActive] = useState(false);
    const [isAllow,setIsAllow] = useState(false);
    const [drink,setDrink] = useState(props.route.params.drink)
    const [bar,setBar] = useState(props.route.params.bar)
    const [user,setUser] = useState(props.route.params.user)
    const [message,setMessage] = useState('Por favor, peça para um membro do estabelecimento validar seu drink !')
    function validateDrink() {
        setMessage('Por favor, peça para um membro do estabelecimento validar seu drink !')
        api.post('/validateDrink',{
                userId: user.id,
                drinkId: drink.id
            })
        .then(res => {
            if(res.data.success){
                openPanel()
                return setIsAllow(true)
            }
            const next = new Date(res.data.next)
            const date = next.getDate() + '/' + (next.getMonth()+1) + '/' + next.getFullYear()
            const hour = next.getHours() + ':' + next.getMinutes()
            setMessage('Você já validou o seu drink hoje!\nSua próxima validação é '+ date + ' às ' + hour )
            openPanel()
        })
        .catch(err=>console.error(err))
    }
    const openPanel = () => {
        if(isAllow)
            setMessage('O seu drink já foi validado')
        setIsPanelActive(true)
    }
    const closePanel = () => {
        setIsPanelActive(false)
    }

    const AllowDrink = () => {
        validateDrink()
        closePanel();
    }

    return (
        <BackgroundImage>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <HeaderSection>
                    <TitleBar
                        size={'19px'}
                        color={'#fff'}
                    >
                        {bar.nome_negocio}
                    </TitleBar>
                    <TitleBar>{drink.nomeDrink}</TitleBar>
                </HeaderSection>
                <MainSection>
                    <ImageContainer>
                        {isAllow ?
                        <Pressable style={{width:'100%'}} onPress={AllowDrink}>
                            <Image source={Aprovado}/>
                        </Pressable> :
                        <Pressable style={{width:'100%'}} onPress={AllowDrink}>
                            <Image source={Aprovar}/>
                        </Pressable>
                        }
                    </ImageContainer>
                </MainSection>
                <FooterSection>
                    <TitleBar
                    size={'20px'}
                    color={'#fff'}
                    style={{textAlign:'center'}}
                    >Aborde um membro do estabelecimento para que ele possa validar o seu drink!</TitleBar>
                </FooterSection>
                <SwipeablePanel {...panelConfig} isActive={isPanelActive}>
                <ContainerSwiper>
                    <ContainerSwiper.box>
                        <ContainerSwiper.card>
                                <ContainerSwiper.Text>
                                    Validar drink
                                </ContainerSwiper.Text>
                        </ContainerSwiper.card>
                        <ContainerSwiper.card>
                                <ContainerSwiper.Text size={'15px'}>
                                        {message}
                                </ContainerSwiper.Text>
                        </ContainerSwiper.card>

                        <ButtonContainer icon={false} title={'Ok'} onPress={closePanel} />

                    </ContainerSwiper.box>
                </ContainerSwiper>
                </SwipeablePanel>
            </View>
        </BackgroundImage>
    );

}

export default AllowDrink;
