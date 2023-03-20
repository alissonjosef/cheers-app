import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import LoginArea  from '../pages/LoginArea';
import History from '../pages/History';

import Map from '../Routes/Maps';
import Home from '../Routes/Home';

import Back from '../../src/components/BackMenuIcon/';


import DrinkIcon from '../assets/svg/drink.svg';
import LocationIcon from '../assets/svg/location.svg';
import PerfilIcon from '../assets/svg/perfil.svg';
import HomeIcon from '../assets/svg/home.svg';

import {styleNavigation} from '../global/styleNavigation'

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
     <Tab.Navigator
       initialRouteName='Main'
       screenOptions={styleNavigation}
       >
         <Tab.Screen  name="LoginArea" component={LoginArea}
           options={{
             headerShown:false,
             tabBarLabel: '',
             tabBarIcon: ({color}) => (
               <PerfilIcon height={25} width={25} fill={color}  />
             ),
           }}
         />
 
         <Tab.Screen  name="History" component={History}
           options={({navigation})=>{
             return {
               headerTransparent: true,
               tabBarLabel: '',
               headerTitleAlign: 'center',
               headerTintColor:'#40E0D0',
               headerTitle:'Gastos e Históricos',
               headerLeft: (props) => (
                 <Back {...navigation}/>
               ),
               tabBarIcon: ({color}) => (
                 <DrinkIcon height={25} width={25} fill={color} />
               ),
             }
 
           }}
         />
 
         <Tab.Screen  name="MapsTab" component={Map}
           options={({navigation,route})=>{
             return {
               headerShown:false,
               tabBarLabel: '',
               tabBarIcon: ({color,focused}) => (
                 <LocationIcon height={25} width={25} fill={color} />
               ),
             }}
           }
         />
 
         <Tab.Screen  name="Main" component={Home}
           options={{
             headerShown:false,
             tabBarLabel: '',
 
             tabBarIcon: ({color,focused}) => (
               <HomeIcon height={25} width={25} fill={color} />
             ),
           }}
         />
       </Tab.Navigator>
    )
}

export default Tabs
 