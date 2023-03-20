import React, {useEffect, useState} from 'react';
import {StyleSheet,View} from 'react-native';


import { PermissionsAndroid } from 'react-native';
import MapView  , { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useIsFocused } from "@react-navigation/native";

import Styles from './style'; 
import api from '../../services/api';
import { BackgroundImage } from '../../global/style';
import Loading from '../../components/Loading';

import {isIOS} from '../../Util/commos'

const MapStore = (props) => {

  const [latitude,setLatitude] = useState(-13.6615306); 
  const [longitude,setLongitude] = useState(-69.6627242); 
  const isFocused = useIsFocused();

  const [allBar,setAllBar] = useState([])
  const [isLoading,setIsLoading] = useState(true)

  async function getAllBar () {
      api.get('/allBar').then(res => {
        setAllBar(res.data)
      }).catch(err => {console.log(err)})
      .finally(_=>setIsLoading(false))
  }
  useEffect(()=>{
    getAllBar()
  },[isFocused])

  useEffect(()=> {
    if(!isIOS) {
      requestLocationPermission()
    }
    if(isIOS) {
      Geolocation.requestAuthorization("whenInUse");
      getAllBar()
      getLocation()
    }
  },[isFocused])

  async function requestLocationPermission (){
    try {
      setIsLoading(true)
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Cheers',
          'message': 'Ative a localização para buscar os bares no mapa!',
          'buttonPositive': "OK"
        }
      )

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Sem acesso a Localização")
      }else{
        getAllBar()
        getLocation()
      }
    } catch (err) {
      console.warn(err)
    }
  }

  function getLocation(){
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLatitude = parseFloat(JSON.stringify(position.coords.latitude));
        const currentLongitude = parseFloat(JSON.stringify(position.coords.longitude));
         
        setLatitude(currentLatitude); 
        setLongitude(currentLongitude);

      },
      (error) => {console.log(error)},
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        
    )
    
  }

  useIsFocused
   
  return isLoading?<BackgroundImage><Loading/></BackgroundImage>:
    <View style={Styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} 
          style={Styles.map}
          region={{
            latitude: latitude,
            longitude:longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <MapView.Marker
            coordinate={{latitude: latitude,
            longitude: longitude}}
            title={'Sua Localização'}
            pinColor='#7CFC00' />
          {
            allBar.map(bar => {
              if(bar.lat && bar.long)
                return <MapView.Marker
                  coordinate={{latitude: parseFloat(bar.lat),
                  longitude: parseFloat(bar.long)}}
                  title={bar.nome_negocio}
                  description='Clique aqui para ver os Drinks!'
                  key={Math.random()}
                  onCalloutPress={() => props.navigation.navigate('Bar', {barId:bar.id})}
                />
            })
          }
        </MapView>
    </View>
   
    
}


   

export default MapStore; 



