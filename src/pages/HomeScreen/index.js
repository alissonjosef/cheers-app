import React, { useEffect, useState } from "react";
import {ImageBackground,Text, View, StyleSheet,SafeAreaView,StatusBar,FlatList, RefreshControl} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Container} from '../../global/style';

import TopMenu from  '../../components/MenuTop';
import Background from '../../assets/img/Background.jpg';
import CardBox from '../../components/CardStore/';
import Styles from './style';
import api from '../../services/api'

import Loading from '../../components/Loading'
import { isIOS } from "../../Util/commos";

const style = StyleSheet.create({
    image: {
        flex: 1,
        alignItems:"center",
        paddingTop: isIOS ? hp('3%') : 0 
    }

})

const styles = StyleSheet.create({
    container: {
      width:'100%',
      marginBottom:hp('18%'),
    },

});

const HomeScreen = (props) => {

    const [barData,setBarData] = useState({})
    const [isLoading,setIsLoading] = useState(true)
    const [search,setSearch] = useState('')
    const isFocused = props.navigation.isFocused()

    async function getAllBar () {
        if(search){
            return api.get(`/filterBar?namePartner=${search}`).then(res => {
                        setBarData(res.data)
                    })
                    .finally(_=>setIsLoading(false))
        }
        return api.get('/allBar').then(res => {
                    setBarData(res.data)
                })
                .finally(_=>setIsLoading(false))
    }

    useEffect(()=> {
        getAllBar()
    },[isFocused])

    useEffect(()=>{
        getAllBar()
    },[search])

    return (
        <Container>
            <ImageBackground source={Background} style={style.image}>
                <TopMenu search={search} setSearch={setSearch}/>
                {isLoading?<Loading/>:
                <SafeAreaView style={styles.container}>
                <FlatList
                    style={Styles.container}
                    data={barData}
                    renderItem={(data) => ( <CardBox data={data} {...props}/>)}
                    keyExtractor={item => item.id}
                    onRefresh={() => getAllBar()}
                    refreshing={isLoading}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={getAllBar} />
                      }
                />
                </SafeAreaView>}
            </ImageBackground>
        </Container>
    )

}

export default HomeScreen;
