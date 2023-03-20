import { View, Text, StyleSheet, Animated, Easing } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TextInput,Button } from 'react-native-paper';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function PerTextInput({multi=false,disableLabelAnimation = false,...props}) {
  
  const fontMax = 13
  const fontMin = 12

  const topMax = 25
  const topMin = 12

  const time = 200

  const [font,setFont] = useState(fontMax);
  const [top,setTop] = useState(topMax);

  const style = StyleSheet.create({
    input: {
      backgroundColor:'rgba(34,36,40,0.1)',
      fontSize:hp('1.5%'),
      fontFamily:'Quicksand-Bold',
    },
    inputMulti: {
      height: 90,
      paddingBottom:hp('7%'),
     
    },
    sizeInput: {
      height:hp('7%'), 
      fontSize:hp('1.5%')
    },
    label: {
      color: "grey",
      fontSize: !props.value && !disableLabelAnimation ? font : fontMin,
      top: !props.value && !disableLabelAnimation ? top : topMin,
      left: 15,
      position: 'absolute',
      borderRadius: 90,
      zIndex: 10000,
      
    },
  })
  
  const thema = {
      color:'#fff'
  }
  const topAnimation = new Animated.Value(topMax);
  const fontAnimation = new Animated.Value(fontMax);

  function onFocus(){
    if(!props.value && !disableLabelAnimation){
      AnimationMovement(topAnimation,topMin,time)
      AnimationMovement(fontAnimation,fontMin,time)
    }
  }
  function onBlur(){
    if(!props.value && !disableLabelAnimation){
      AnimationMovement(topAnimation,topMax,time)
      AnimationMovement(fontAnimation,fontMax,time)
    }
  }
  async function AnimationMovement(animation,value,timer){
    Animated.timing(animation, {
      toValue: value,
      duration: timer,
      useNativeDriver: false,
    }).start()
  }
  
  topAnimation.addListener((value)=>{
    setTop(value.value)
  })
  fontAnimation.addListener((value)=>{
    setFont(value.value)
  })
  
  return (
    <View>
      <Text style={style.label}>{props.placeholder}</Text>
        <TextInput 
          activeOutlineColor={'#FF0099'}
          outlineColor={'#FF0099'}
          mode={'outlined'}
          multiline={multi}
          style={[style.input,multi?style.inputMulti:null,style.sizeInput]}
          theme={{ colors: { placeholder: thema.color, text: thema.color}}}
          {...props}
          placeholder=""
          onBlur={onBlur}
          onFocus={onFocus}
          blurOnSubmit
          numberOfLines={multi?3:1}
      />
    </View>
  )
}



export default PerTextInput; 