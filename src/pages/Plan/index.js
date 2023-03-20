import React, { useEffect, useState } from 'react'
import { View } from 'react-native';

import Swiper from 'react-native-swiper';


import {BackgroundImage} from '../../global/style';

import SliderBox from  '../../components/PlanSlider/';
import LogoCheers from '../../components/LogoCheers/';

import  Plans from '../../Util/PlanData';
import YourPlan from '../../components/YourPlan';
import { cancelSubscription, getSubscription } from '../../services/subscriptionServices';
import { useIsFocused } from '@react-navigation/native';
import Loading from '../../components/Loading'

export default function Plan (props) {
  const [subscription,setSubscription] = useState({})
  const [isLoading,setIsLoading] = useState(true)
  const [isLogged,setIsLogged] = useState(false)
  const [userData,setUserData] = useState({})
  const isFocused = useIsFocused()

  useEffect(()=>{
    importData()
  },[props,isFocused])

  async function importData(){
      setIsLoading(true)
      getSubscription().then(sub => {
        if(sub != null){
          setIsLogged(true)
          setSubscription(sub)
          setUserData({
            isLogged:true,
            email:sub.userData.email,
            id:sub.userData.id
          })
        }
      }).catch(err =>{
        setIsLogged(false)
      })
      .finally(_=>setIsLoading(false))
  }
  async function removeSubscription(){
    setIsLoading(true)
    await cancelSubscription(subscription)
    await importData()
  }
  return (
    <BackgroundImage>
      {isLoading?<Loading/>: <>
      {!subscription.ok?
            <LogoCheers
              title={'Escolha o seu plano'}/>:
            <LogoCheers
              title={'Assinatura '+ subscription.status}
              subtitle={'Sua assinatura termina em '+ subscription.end_date}
            />}

        <View style={{height:'60%',width:'80%'}}>
          {subscription.ok?<Swiper showsButtons={false} activeDotColor={'#40E0D0'} dotColor={'#FF0099'} showsPagination={true} >
            <YourPlan {...subscription} removeSubscription={removeSubscription}/>
          </Swiper> :
          <Swiper showsButtons={false} activeDotColor={'#40E0D0'} dotColor={'#FF0099'} showsPagination={true} >
            <SliderBox {...Plans.Semanal}  {...userData} goBack={props.navigation.goBack}/>
            <SliderBox {...Plans.Mensal} {...userData} goBack={props.navigation.goBack}/>
            <SliderBox {...Plans.Anual} {...userData} goBack={props.navigation.goBack}/>
          </Swiper>}

        </View>
        </> }
    </BackgroundImage>
  )
}
