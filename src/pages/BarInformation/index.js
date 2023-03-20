import React, { useState, useEffect, useRef } from 'react';
import {
    ImageBackground,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    Pressable
} from 'react-native';

import { Divider, Button, ActivityIndicator } from 'react-native-paper';
import { SwipeablePanel } from 'rn-swipeable-panel';

import { Data } from '../../Util/BaseData';

import CardBar from '../../components/CardBar/';
import ButtonContainer from '../../components/Button/';

import {
    BanerContainer,
    ListFlat,
    ViewList,
    SectionTitle,
    ButtonAccept,
    ContainerSwiper,
    ListText,
    ListDays
} from './style';


import { TitleBar, SubTitleBar, emptyList } from '../../global/style';

import Background from '../../assets/img/Background.jpg';
import Baner from '../../assets/img/baner.jpg';
import withoutPhoto from '../../assets/img/establishment_without_photo.png';

import Icon from 'react-native-vector-icons/Ionicons';

import { BASE_URL } from '../../Util/constants'
import api from '../../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserFavs, getUserInfo } from '../../services/loginService';
import { getSubscription } from '../../services/subscriptionServices';
import { Linking } from 'react-native';
import Loading from '../../components/Loading';
import { useIsFocused } from '@react-navigation/native';

import DialogModal from '../../components/Dialog'
import { mensagens } from '../../mock/mensages'

export default function BarInformation(props) {

    const [panelConfig, setPanelConfig] = useState(
        {
            fullWidth: true,
            onlyLarge: true,
            showCloseButton: false,
            closeOnTouchOutside: true,
            style: { backgroundColor: '#790048', height: '70%' },
            onClose: () => closePanel(),
            onPressCloseButton: () => closePanel(),
        }
    );
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [isLikedContent, setIsLikedContent] = useState(false);
    const [barInfo, setBarInfo] = useState({});
    const [drinks, setDrinks] = useState([]);
    const [drinkSelect, setDrinkSelect] = useState({});
    const [isDrinkSelect, setIsDrinkSelect] = useState(false);
    const [isLogged, setIsLogged] = useState(false)
    const [userData, setUserData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isDrinkLoading, setIsDrinkLoading] = useState(true)
    const [subscription, setSubscription] = useState({ ok: false })
    const [hasSubscription, setHasSubscription] = useState(false)
    const [buttonColor, setButtonColor] = useState('#4E4E4E')
    const [modal, setModal] = useState(false);
    const [hoursBar, sethoursBar] = useState([]);

    const disableColor = '#4E4E4E'
    const enableColor = '#FF0099'
    const [buttonInfo, setButtonInfo] = useState({ enable: false, color: disableColor })

    const isFocused = useIsFocused()
    const flatListRef = useRef()


    const disableButton = () => {

        const dateFormat = new Date()
        const weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const day = weekday[dateFormat.getDay()];

        const active = hoursBar[`${day}_active`];
        const from = hoursBar[`${day}_from`];
        const to = hoursBar[`${day}_to`];

        if (active && from && to) {
            if (new Date().getHours() >= from && new Date().getHours() + 1 <= to) {
                return false;
            } else {
                return true;
            }
        }
        return true;
    }


    function scrollToIndex(index) {
        flatListRef.current.scrollToIndex({ animated: true, index: index, viewPosition: 0.5 })
    }

    const openPanel = () => {
        setIsPanelActive(true)
    }

    const closePanel = () => {
        setIsPanelActive(false)
    }

    const likeContent = () => {
        let liked = isLikedContent;
        setIsLikedContent(!liked)
    }

    function getBarInformation() {
        return api.get('/getBar', { params: { id: props.route.params.barId } })
    }

    function getDrinkInformation() {
        return api.get('/getDrink', { params: { id: props.route.params.barId } })
    }

    
    function getBarHours() {
        const idBarHour = props.route.params.barId
        return api.get(`/getdaysBar/${idBarHour}`)
    }

    const getLoginUser = async () => {
        const tempData = await AsyncStorage.getItem("userData");
        console.log(tempData)
        if (tempData != null) {
            setUserData(tempData)
            return setIsLogged(true)
        }

        return setIsLogged(false)
    }

    function buttonEnable() {
        if (isLogged && subscription.ok && drinks.length > 0) {
            setHasSubscription(true)
            setButtonColor('#FF0099')
            return
        }
        setButtonColor('#4E4E4E')
        setHasSubscription(false)
    }

    useEffect(() => {
        loadAllInfo()
        getLoginUser();
        buttonEnable();
    }, [props, isFocused]);

    async function loadAllInfo() {
        setIsLoading(true)
        setIsDrinkLoading(true)

        getBarInformation()
            .then(res => {
                const bar = res.data[0]
                if (bar)
                    setBarInfo(bar)
                getUserInfo()
                    .then(userData => {
                        if (userData) {
                            setUserData(userData)
                            setIsLogged(true)
                            getSubscription()
                                .then(sub => {
                                    if (sub)
                                        setSubscription(sub)
                                    getUserFavs()
                                        .then(favs => {
                                            if (favs) {
                                                favs.map(fav => {
                                                    if (fav.id == bar.id)
                                                        setIsLikedContent(true)
                                                })
                                            }
                                            setIsLoading(false)
                                        })
                                })

                        } else {
                            setIsLogged(false)
                            setIsLoading(false)
                        }
                        getDrinkInformation()
                            .then(res => {
                                const drinks = res.data
                                const drinksToAdd = []
                                drinks.map(drink => {
                                    if (drink.active == 'S')
                                        drinksToAdd.push(drink)
                                })

                                if (drinksToAdd.length > 0) {
                                    setDrinks([{ id: -1 }, ...drinksToAdd, { id: -2 }])
                                    setDrinkSelect(drinksToAdd[0])
                                    setIsDrinkSelect(true)
                                } else {
                                    setDrinks(drinksToAdd)
                                }
                                setIsDrinkLoading(false)
                            })

                        getBarHours()
                            .then(res => {
                                sethoursBar(res.data)
                            }).catch(err => console.error(err))

                    })
            })




        // const tempBar = await getBarInformation()
        // const tempDrink = await getDrinkInformation()

        // setButtonInfo({enable:false,color:disableColor})

        // const tempUser = await getUserInfo()
        // if(tempUser != null){
        //     setUserData(tempUser)
        //     setIsLogged(true)
        //     const tempSub = await getSubscription()
        //     if(tempSub != null){
        //       setSubscription(tempSub)
        //       if(tempSub.ok)
        //         setButtonInfo({enable:true,color:enableColor})
        //     }
        //     const tempFavs = await getUserFavs();
        //     if(tempFavs != null)
        //         tempFavs.map(fav => {
        //             if(fav.id == tempBar.data[0].id)
        //                 setIsLikedContent(true)
        //     })
        // }
        // setBarInfo(tempBar.data[0])

        // setDrinks(drinksToAdd)
        // setDrinkSelect(drinksToAdd[0])


        // setIsLoading(false)
    }



    async function toggleFavorite(props) {
        if (isLogged) {
            if (isLikedContent) {
                api.delete('/delFav', {
                    data: {
                        user_id: userData.id,
                        partner_id: barInfo.id
                    }
                }).catch(err => console.error(err))
                setIsLikedContent(false)
                await getUserFavs();
            } else {
                api.post('/setFav', {
                    user_id: userData.id,
                    partner_id: barInfo.id
                }).catch(err => console.error(err))
                setIsLikedContent(true)
                await getUserFavs();
            }
        } else {
            setIsLikedContent(!isLikedContent)
        }
    }

    function openSocialMedia(media) {
        if (media == "facebook" && barInfo.url_facebook != '')
            Linking.openURL(barInfo.url_facebook).catch(err => console.error('An error occurred', err));
        if (media == "instagram" && barInfo.url_instagram != '')
            Linking.openURL(barInfo.url_instagram).catch(err => console.error('An error occurred', err));
    }

    const accpetDrink = () => {
        if (hasSubscription) {
            props.navigation.navigate('Drink', { drink: drinkSelect, user: userData, bar: barInfo })
        }
        setModal(true);
    }

    if (isLoading)
        return <ImageBackground source={Background} style={style.image}>
            <Loading />
        </ImageBackground>

    return <ImageBackground source={Background} style={style.image}>
        <BanerContainer>
            <ImageBackground source={barInfo.image_bar ? { uri: BASE_URL + barInfo.image_bar } : withoutPhoto} style={style.baner}>
                <TitleBar>{barInfo?.nome_negocio}</TitleBar>
                <BanerContainer.Row>
                    <BanerContainer.Item >
                        <SubTitleBar>{barInfo?.descricao_negocio}</SubTitleBar>
                    </BanerContainer.Item>
                    <BanerContainer.Item>
                        <BanerContainer.Row>
                            <Pressable onPress={() => toggleFavorite()} style={{ paddingHorizontal: 5 }}>
                                {
                                    isLikedContent ?
                                        <Icon name="heart" size={20} color="#ffff" /> :
                                        <Icon name="heart-outline" size={20} color="#ffff" />

                                }
                            </Pressable>
                            <View>
                                <Button mode="contained" color="#FF0099" labelStyle={{ fontSize: 5 }} onPress={openPanel}>
                                    Mais Informações
                                </Button>
                            </View>

                        </BanerContainer.Row>
                    </BanerContainer.Item>

                </BanerContainer.Row>

            </ImageBackground>
        </BanerContainer>
        <Divider />
        {isDrinkLoading ? <Loading /> : <>
            <View style={{ width: '100%', marginTop: '2%' }}>
                <SectionTitle>Nossos Drinks</SectionTitle>
            </View>
            {drinks.length == 0 ?
                <Text style={emptyList.text}>Sem drinks disponiveís!!</Text> :
                <ViewList>
                    <ListFlat
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={drinks}
                        ref={flatListRef}
                        keyExtractor={item => item.id}
                        renderItem={item => (
                            <CardBar
                                close={disableButton()}
                                style={{ position: 'absolute' }}
                                {...item}
                                actualId={drinkSelect.id}
                                onClick={setIsDrinkSelect}
                                drinkSelect={setDrinkSelect}
                                scrollTo={scrollToIndex}
                                index={drinks.findIndex(object => {
                                    return object.id === item.item.id;
                                })}
                            />
                        )
                        }

                    />
                </ViewList>}
            <BanerContainer.section>
                {isDrinkSelect &&
                    (
                        <View>
                            <ScrollView>
                                <ListText>{drinkSelect.ingredientes}</ListText>
                            </ScrollView>
                        </View>
                    )
                }
            </BanerContainer.section>

            <BanerContainer.footer>
                <Button
                    mode={disableButton() ? 'outlined' : 'contained'}
                    color={buttonColor}
                    style={{ padding: 4 }}
                    labelStyle={{ fontSize: 12 }}
                    onPress={accpetDrink}
                    disabled={disableButton()}
                >
                    Validar Drink
                </Button>
            </BanerContainer.footer>

            {modal ?
                <DialogModal
                    text={mensagens.DRINK_NOT_ALLOW}
                    visible={modal}
                    setVisible={setModal}
                /> : null}

        </>}
        <SwipeablePanel {...panelConfig} isActive={isPanelActive}>
            <ContainerSwiper>
                <ContainerSwiper.box>
                    <ScrollView>
                        <ContainerSwiper.Cardbox>
                            <ContainerSwiper.Text>
                                Mais informações
                            </ContainerSwiper.Text>
                            <ContainerSwiper.Text size={'10px'}>
                                {barInfo?.descricao_negocio}
                            </ContainerSwiper.Text>
                        </ContainerSwiper.Cardbox>

                        <ContainerSwiper.Cardbox>
                            <ContainerSwiper.TextLoc>
                                Endereço:
                            </ContainerSwiper.TextLoc>
                            <ContainerSwiper.TextLoc>
                                {barInfo?.endereco}
                            </ContainerSwiper.TextLoc>
                            <ContainerSwiper.TextLoc>
                                Funcionamento:{"\n"}{barInfo?.horario_funcionamento}
                            </ContainerSwiper.TextLoc>
                            <ContainerSwiper.TextLoc>
                                Contato:{"\n"} {barInfo?.telefone}
                            </ContainerSwiper.TextLoc>
                        </ContainerSwiper.Cardbox>



                        {barInfo.url_instagram != '' &&
                            <ButtonContainer
                                icon={'logo-instagram'}
                                title='Instagram'
                                onPress={() => openSocialMedia('instagram')} />
                        }
                        {barInfo.url_facebook != '' &&
                            <ButtonContainer
                                icon={'logo-facebook'}
                                title='Facebook'
                                onPress={() => openSocialMedia('facebook')} />
                        }


                        <View style={{ marginBottom: 60 }}>
                            <View>
                                <Text style={{ color: 'white', marginTop: 25, marginBottom: 25 }}>Dias e horários disponíveis</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10 }}>
                                    <Text style={{ color: 'white' }}></Text>
                                </View>
                                <View style={{ backgroundColor: '#FF0099', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10 }}>
                                    <Text style={{ color: 'white' }}>Dom</Text>
                                </View>
                                <View style={{ backgroundColor: '#FF0099', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white' }}>2ª</Text>
                                </View>
                                <View style={{ backgroundColor: '#FF0099', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white' }}>3ª</Text>
                                </View>
                                <View style={{ backgroundColor: '#FF0099', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white' }}>4ª</Text>
                                </View>
                                <View style={{ backgroundColor: '#FF0099', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white' }}>5ª</Text>
                                </View>
                                <View style={{ backgroundColor: '#FF0099', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white' }}>6ª</Text>
                                </View>
                                <View style={{ backgroundColor: '#FF0099', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 15 }}>
                                    <Text style={{ color: 'white' }}>Sab</Text>
                                </View>
                            </View>


                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                                <View style={{ backgroundColor: '#FF0099', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10 }}>
                                    <Text style={{ color: 'white' }}>De</Text>
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    {hoursBar.sunday_from && hoursBar.sunday_to ?
                                        <Text style={{ color: 'black' ,fontSize: 12}}>{hoursBar.sunday_from}:00</Text>
                                        :
                                        <Text style={{ color: 'black', marginRight: 3 }}></Text>
                                    }
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    {hoursBar.monday_from && hoursBar.monday_to ?
                                        <Text style={{ color: 'black', fontSize: 12 }}>{hoursBar.monday_from}:00</Text>
                                        :
                                        <Text style={{ color: 'black', marginRight: 3 }}></Text>
                                    }
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    {hoursBar.tuesday_from && hoursBar.tuesday_to ?
                                        <Text style={{ color: 'black',fontSize: 12 }}>{hoursBar.tuesday_from}:00</Text>
                                        :
                                        <Text style={{ color: 'black', marginRight: 3 }}></Text>
                                    }
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    {hoursBar.wednesday_from && hoursBar.wednesday_to ?
                                        <Text style={{ color: 'black',fontSize: 12 }}>{hoursBar.wednesday_from}:00</Text>
                                        :
                                        <Text style={{ color: 'black', marginRight: 3 }}></Text>
                                    }
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    {hoursBar.thursday_from && hoursBar.thursday_to ?
                                        <Text style={{ color: 'black',fontSize: 12 }}>{hoursBar.thursday_from}:00</Text>
                                        :
                                        <Text style={{ color: 'black', marginRight: 3 }}></Text>
                                    }
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    {hoursBar.friday_from && hoursBar.friday_to ?
                                        <Text style={{ color: 'black',fontSize: 12 }}>{hoursBar.friday_from}:00</Text>
                                        :
                                        <Text style={{ color: 'black', marginRight: 3 }}></Text>
                                    }
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    {hoursBar.saturday_from && hoursBar.saturday_to ?
                                        <Text style={{ color: 'black', marginRight: 3, fontSize: 12 }}>{hoursBar.saturday_from}:00</Text>
                                        :
                                        <Text style={{ color: 'black', marginRight: 3 }}></Text>
                                    }
                                </View>
                            </View>


                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                                <View style={{ backgroundColor: '#FF0099', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 10 }}>
                                    <Text style={{ color: 'white' }}>Até</Text>
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    {hoursBar.sunday_to && hoursBar.sunday_from ?
                                        <Text style={{ color: 'black',fontSize: 12 }}>{hoursBar.sunday_to}:00</Text>
                                        :
                                        <Text style={{ color: 'black', marginRight: 3 }}></Text>
                                    }
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    {hoursBar.monday_to && hoursBar.monday_from ?
                                        <Text style={{ color: 'black',fontSize: 12 }}>{hoursBar.monday_to}:00</Text>
                                        :
                                        <Text style={{ color: 'black', marginRight: 3 }}></Text>
                                    }
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    {hoursBar.tuesday_to && hoursBar.tuesday_from ?
                                        <Text style={{ color: 'black',fontSize: 12 }}>{hoursBar.tuesday_to}:00</Text>
                                        :
                                        <Text style={{ color: 'black', marginRight: 3 }}></Text>
                                    }
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    {hoursBar.wednesday_to && hoursBar.wednesday_from ?
                                        <Text style={{ color: 'black',fontSize: 12 }}>{hoursBar.wednesday_to}:00</Text>
                                        :
                                        <Text style={{ color: 'black', marginRight: 3 }}></Text>
                                    }
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    {hoursBar.thursday_to && hoursBar.thursday_from ?
                                        <Text style={{ color: 'black',fontSize: 12 }}>{hoursBar.thursday_to}:00</Text>
                                        :
                                        <Text style={{ color: 'black', marginRight: 3 }}></Text>
                                    }
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center' }}>
                                    {hoursBar.friday_to && hoursBar.friday_from ?
                                        <Text style={{ color: 'black',fontSize: 12 }}>{hoursBar.friday_to}:00</Text>
                                        :
                                        <Text style={{ color: 'black', marginRight: 3 }}></Text>
                                    }
                                </View>
                                <View style={{ backgroundColor: '#FFF', width: 40, height: 30, marginRight: 3, alignItems: 'center', justifyContent: 'center', borderBottomRightRadius: 15 }}>
                                    {hoursBar.saturday_to && hoursBar.saturday_from ?
                                        <Text style={{ color: 'black',fontSize: 12, marginRight: 3 }}>{hoursBar.saturday_to}:00</Text>
                                        :
                                        <Text style={{ color: 'black', marginRight: 3 }}></Text>
                                    }
                                </View>
                            </View>
                            {/* <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white' }}>Dom</Text>
                                {drinkSelect.sunday_from && drinkSelect.sunday_to ? (
                                    <Text style={{ color: 'white', marginLeft: 20 }}>{drinkSelect.sunday_from}h às {drinkSelect.sunday_to}h</Text>
                                ) : <Text style={{ color: 'white', marginLeft: 20 }}></Text>}
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white' }}>2º</Text>
                                {drinkSelect.monday_from && drinkSelect.monday_to ? (
                                    <Text style={{ color: 'white', marginLeft: 20 }}>{drinkSelect.monday_from}h às {drinkSelect.monday_to}h</Text>
                                ) : <Text style={{ color: 'white', marginLeft: 20 }}></Text>}
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white' }}>3º</Text>
                                {drinkSelect.tuesday_from && drinkSelect.tuesday_to ? (
                                    <Text style={{ color: 'white', marginLeft: 20 }}>{drinkSelect.tuesday_from}h às {drinkSelect.tuesday_to}h</Text>
                                ) : <Text style={{ color: 'white', marginLeft: 20 }}></Text>}
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white' }}>4º</Text>
                                {drinkSelect.wednesday_from && drinkSelect.wednesday_to ? (
                                    <Text style={{ color: 'white', marginLeft: 20 }}>{drinkSelect.wednesday_from}h às {drinkSelect.wednesday_to}h</Text>
                                ) : <Text style={{ color: 'white', marginLeft: 20 }}></Text>}
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white' }}>5º</Text>
                                {drinkSelect.thursday_from  && drinkSelect.thursday_to ?  (
                                    <Text style={{ color: 'white', marginLeft: 20 }}>{drinkSelect.thursday_from}h às {drinkSelect.thursday_to}h</Text>
                                ) : <Text style={{ color: 'white', marginLeft: 20 }}></Text>}
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white' }}>6º</Text>
                                {drinkSelect.friday_from && drinkSelect.friday_to ? (
                                    <Text style={{ color: 'white', marginLeft: 20 }}>{drinkSelect.friday_from}h às {drinkSelect.friday_to}h</Text>
                                ) : <Text style={{ color: 'white', marginLeft: 20 }}></Text>}
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white' }}>Sab</Text>
                                {drinkSelect.saturday_from && drinkSelect.saturday_to ? (
                                    <Text style={{ color: 'white', marginLeft: 20 }}>{drinkSelect.saturday_from}h às {drinkSelect.saturday_to}h</Text>
                                ) : <Text style={{ color: 'white', marginLeft: 20 }}></Text>}
                            </View> */}
                        </View>
                    </ScrollView>
                </ContainerSwiper.box>
            </ContainerSwiper>
        </SwipeablePanel>
    </ImageBackground >

}

const style = StyleSheet.create({
    image: {
        flex: 1,
        alignItems: "center",
    },
    baner: {
        flex: 1,
        justifyContent: "flex-end",
        padding: 5,
        opacity: 0.9,
    },
    container: {
        width: '100%',
    },

})