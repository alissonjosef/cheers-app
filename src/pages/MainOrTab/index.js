import React, { useEffect } from 'react';
import { isUserFristTimeInApp } from '../../services/termService';

import {Main} from './style'; 
import { ActivityIndicator, Colors } from 'react-native-paper';

const MainOrTab = ({navigation}) => {

    useEffect(()=> {
        moveToMainOrStayInTerms();
    },[]); 

    const moveToMainOrStayInTerms = async () => {
        const userInApp = await isUserFristTimeInApp();

        if(userInApp) {
          return navigation.navigate('TabsMain'); 
        }
        return navigation.navigate('Terms'); 
    }

  return (
    <Main>
        <ActivityIndicator animating={true} color={Colors.purple400} />
    </Main>
  );
}

export default MainOrTab;