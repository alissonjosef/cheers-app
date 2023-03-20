import React, { useRef, useState } from 'react';
import {Text, Image, View, TouchableOpacity, Keyboard} from 'react-native';
import { Menu , style} from './style';

import Logo from '../../assets/img/logo.png';

import Ionicons from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-gesture-handler';

import Search from '../../assets/svg/Icone-Lupa.svg'; 

import {heightPercentageToDP as hp} from 'react-native-responsive-screen'; 

export default function TopMenu({setSearch,search}) {
    const [open,setOpen] = useState(false)
    const ref = useRef(null);
    function toggleSearch(){
        setSearch('')
        if(!open){
            ref.current.focus();
        }else{
            Keyboard.dismiss()
        }
        setOpen(!open)
        
    }
    return (
        <Menu>
            <Menu.Row>
                <Menu.RowLeft>
                    <Image source={Logo}/>
                </Menu.RowLeft> 
                    <View style={{opacity:open?100:0,width:'60%'}}>
                        <TextInput
                            ref={ref}
                            style={style.input}
                            value={search}
                            onChangeText={search => setSearch(search)}
                            />
                    </View>
                <Menu.RowRight>
                    <TouchableOpacity onPress={()=>toggleSearch()}>
                        <Text style={{textAlign:'right',paddingRight:10,}}>
                            <Search height={hp('3%')} width={30} color={'#40E0D0'}/>
                        </Text>
                    </TouchableOpacity>
                </Menu.RowRight> 
            </Menu.Row>
        </Menu>
    );
}