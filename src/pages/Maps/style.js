import {StyleSheet} from 'react-native';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';



const Styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom:0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom:hp('8%'),
    },
});

export default Styles; 
