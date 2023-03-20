// import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/Login';
import MainOrTab from './pages/MainOrTab';
import Register from './pages/Register';
import Partner from './pages/Partner';
import Help from './pages/Help';
import Faq from './pages/Faq';
import ContactUs from './pages/ContactUs';
import Plan from './pages/Plan';
import Favoritos from './pages/Favoritos';
import RecoverPassword from './pages/RecoverPassword';
import CodeRecover from './pages/CodeRecover';
import Recover from './pages/Recover';

import Back from '../src/components/BackMenuIcon/';


import Terms from './Routes/Terms';
import Tabs from './Routes/Tabs';

const Stack = createNativeStackNavigator();

export default function Router() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MainOrTab'>
        <Stack.Screen name="MainOrTab" component={MainOrTab} options={{ headerShown: false }} />
        <Stack.Screen name="TabsMain" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Terms" component={Terms} options={{ headerShown: false }} />
        <Stack.Group
          screenOptions={({ navigation }) => {
            return {
              headerStyle: {
                borderBottomWidth: 100,
                borderBottomColor: 'red',
              },
              headerTitleStyle: {
                fontSize: 18,
                fontFamily: 'Quicksand-Bold'
              },
              headerTransparent: true,
              headerTitleAlign: 'center',
              headerTintColor: '#40E0D0',
              headerLeft: (props) => (
                <Back {...navigation} />
              ),
            }
          }
          }
        >
          <Stack.Screen name="Ajuda" component={Help} />
          <Stack.Screen name="Fale Conosco" component={ContactUs} />
          <Stack.Screen name="Dúvidas frequentes" component={Faq} />
          <Stack.Screen name="Favoritos" component={Favoritos} />
        </Stack.Group>
        <Stack.Group
          screenOptions={({ navigation }) => {
            return {
              headerStyle: {
                borderBottomWidth: 100,
                borderBottomColor: 'red',
              },
              headerTitleStyle: {
                fontSize: 18,
                fontFamily: 'Quicksand-Bold'
              },
              headerTransparent: true,
              headerTitleAlign: 'center',
              headerTintColor: '#40E0D0',
              headerLeft: (props) => (
                <Back {...navigation} />
              )
            }
          }
          }
        >

          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Register} />
          <Stack.Screen name="RecuperarSenha" component={RecoverPassword} options={{headerShown:false}}/>
          <Stack.Screen name="CodigoRecuperacao" component={CodeRecover} options={{headerShown:false}}/>
          <Stack.Screen name="Recuperar" component={Recover} options={{headerShown:false}}/>
          <Stack.Screen name="Parceiros" component={Partner} />
          <Stack.Screen name="Planos" component={Plan} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

