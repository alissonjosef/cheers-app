import React,{useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native'
import Router from './routes'; 
import SplashScreen from  "react-native-splash-screen";
import KeyboardManager from 'react-native-keyboard-manager';
import { isIOS } from './Util/commos';
import ImmersiveMode from 'react-native-immersive-mode';

export default function App() {

    useEffect(() => {
        LogBox.ignoreAllLogs();
        SplashScreen.hide();   
        ImmersiveMode.fullLayout(true);
        ImmersiveMode.setBarMode('Full');

        if(isIOS) {
            KeyboardManager.setEnable(true);
            
        } 
    },[]);

    return (
        <>
          <StatusBar 
                barStyle="light-content"
                backgroundColor="#170028"
                setTranslucent="true"
            />
            <Router/>
        </>
    );
}
