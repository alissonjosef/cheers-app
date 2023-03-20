import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Back from '../components/BackMenuIcon/'


import HomeScreen  from '../pages/HomeScreen';
import AllowDrink  from  '../pages/AllowDrink';
import BarInformation  from '../pages/BarInformation';

const Stack = createNativeStackNavigator();

const Home = () => {

    return (
        <Stack.Navigator initialRouteName='HomeBar'>          
          <Stack.Screen options={{headerShown:false,}} name="HomeBar" component={HomeScreen} />
          <Stack.Screen 
            options={({navigation})=>{
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
            name="Drink" 
            component={AllowDrink} 
           />
          <Stack.Screen 
            name="Bar" 
            component={BarInformation}
            options={({navigation})=>{
                return {
                headerStyle: {
                    backgroundColor: '#170028',
                },
                headerLeft: (props) => (
                    <Back {...navigation}/>
                ),
                headerTitleAlign: 'center',
                headerTintColor:'#40E0D0',             
                }}
            }  
          />   
        </Stack.Navigator>
    )

}

export default Home; 