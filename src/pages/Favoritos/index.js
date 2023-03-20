
import React, { useState, useEffect } from 'react';
import {SafeAreaView,FlatList, ActivityIndicator, Text} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {BackgroundImage, emptyList} from '../../global/style';

import {TextTitle,TextDetail,HeaderSection,FaqArea} from './style';

import {FavorBar} from '../../Util/BaseData';
import CardLike from '../../components/Componente'; 
import { getUserFavs, getUserInfo } from '../../services/loginService';
import Loading from '../../components/Loading';
import { useIsFocused } from '@react-navigation/native';
import { RefreshControl } from 'react-native';

function Favoritos(props) {
    const [userFavs,setUserFavs] = useState()
    const [isLoading,setIsLoading] = useState(true)
    const [isLogged,setIsLogged] = useState(false)

    const isFocused = useIsFocused()

    useEffect(()=>{
        getFavs()
    },[props,isFocused])

    async function getFavs(){
        setIsLoading(true)
        const tempData = await getUserInfo()
        if(tempData != null){
            setIsLogged(true)
            const tempFavs = await getUserFavs();
            if(tempFavs != null)
            setUserFavs(tempFavs)
            setIsLoading(false)
            return true
        }
        setIsLogged(false)
        setIsLoading(false)
        return false
    }
    return (
    
        <BackgroundImage >   
            <HeaderSection>   
                {/* <FaqCard  top />                  */}
                <TextTitle>Bares e restaurantes {'\n'} que você ama {':)'}</TextTitle>
                <TextDetail>Clique no {<Icon name='heart-outline' size={15} color={'#ff0099'} />} para add um favorito</TextDetail>      
            </HeaderSection>
            
            <FaqArea>
                <SafeAreaView style={{width:'100%'}}>
                {isLoading?<Loading/>:
                    <FlatList
                        style={{height:'100%'}}
                        data={userFavs}
                        renderItem={(item) => ( <CardLike {...props} value={item.item}/>)}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={() =><Text style={emptyList.text}>{isLogged?'Você ainda não tem nenhum favorito!':'Faça login para adicionar bares aos favoritos!'}</Text>}
                        refreshing={isLoading}
                        refreshControl={
                            <RefreshControl refreshing={isLoading} onRefresh={getFavs} />
                          }
                    />}
                </SafeAreaView>
            </FaqArea>
            
            
         
           
        </BackgroundImage>


    )
  
    
}



export default Favoritos;