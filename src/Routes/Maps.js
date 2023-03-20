import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Back from '../components/BackMenuIcon/'

import MapStore from  '../pages/Maps/';


const Stack = createNativeStackNavigator();

const Map = () => {
    return (
        <Stack.Navigator initialRouteName='Maps'>
            <Stack.Group 
                screenOptions={({navigation})=>{
                    return {  
                    headerStyle: {
                        backgroundColor: '#170028',
                    },   
                    headerTitleStyle:{
                        fontSize:18,
                        fontFamily:'Quicksand-Bold'
                    },                   
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTintColor:'#40E0D0',
                    headerLeft: (props) => (
                        <Back {...navigation}/>
                        )                               
                    }}
                }
            >
            <Stack.Screen name="Maps" component={MapStore}/>        
            </Stack.Group>
        </Stack.Navigator > 
    )
}

export default Map; 