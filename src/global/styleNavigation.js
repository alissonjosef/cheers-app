import {isIOS} from '../Util/commos'

export const styleNavigation = {      
    tabBarActiveTintColor:'#FF0099',
    tabBarInactiveTintColor:'#40E0D0',
    tabBarStyle: { 
      height: isIOS ? 70 : 30 ,
      paddingHorizontal: isIOS ? 15 : 20,
      paddingTop: isIOS ? 15 : 20,
      paddingBottom: isIOS ? 0 : 30,
      backgroundColor: 'rgba(34,36,40,0.5)',
      position: 'absolute',
      borderTopWidth: 0,
    }
}