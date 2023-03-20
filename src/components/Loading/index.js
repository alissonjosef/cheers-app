import React from 'react'; 
import {ActivityIndicator,Colors} from 'react-native-paper'


import {LoadingView} from './style'

const Loading = () => {
    return (
        <LoadingView>
            <ActivityIndicator animating={true} color={Colors.purple400} />
        </LoadingView>
    )    

}


export default Loading; 