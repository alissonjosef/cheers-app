import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Back from '../components/BackMenuIcon/'

import TermsOfUse  from  '../pages/TermsOfUse';
import Location  from  '../pages/Location';
import Allow  from  '../pages/Allow';

const Stack = createNativeStackNavigator();

const Terms = () =>  {
    return (
      <Stack.Navigator initialRouteName='TermsOfUse' screenOptions={{headerShown:false}}>
        <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="Allow" component={Allow} />
      </Stack.Navigator>      
     
    )
}

export default Terms; 
  