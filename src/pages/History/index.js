import React, {useEffect, useState} from 'react';
import {View,Pressable,Text,SafeAreaView,FlatList, ActivityIndicator} from 'react-native';

import HistoryOption from '../../components/HistoryCard';
import Loading from '../../components/Loading'

import {BackgroundImage, emptyList} from '../../global/style';
import {Style} from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {getUserInfo} from "../../services/loginService";
import api from "../../services/api";
import NumberFormat from "react-number-format";
import { useIsFocused } from '@react-navigation/native';
import { RefreshControl } from 'react-native';

const History = (props) => {
    const isFocused = useIsFocused();
    const [daychosen,setDayChosen] = useState('');
    const [monthNumber,setMonthNumber] = useState(0);
    const [randomValue,setRandomValue] = useState(Math.floor(Math.random() * 5000 + 1));
    const Month = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const [drinkHistory,setDrinkHistory] = useState([]);
    const [amount,setAmount] = useState(0.00);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingScreen, setIsLoadingScreen] = useState(true);
    const [isLogged,setIsLogged] = useState(false)

    const [monthFilter, setMonthFilter] = useState(new Date().getMonth())
    const [yearFilter, setYearFilter] = useState(new Date().getFullYear())
    const [countMonths, setCountMonths] = useState(12)

    const downMonth = newNumber => {
        if (countMonths == 0) {
          return;
        }

        if (newNumber < 0) {
          setMonthFilter(11);
          setYearFilter(yearFilter - 1);
        } else {
          setMonthFilter(monthFilter - 1);
          setCountMonths(countMonths - 1);
        }
      };

      const upMonth = newNumber => {
        if (countMonths == 12) {
          return;
        }

        if (newNumber > 11) {
          setMonthFilter(0);
          setYearFilter(yearFilter + 1);
        } else {
          setMonthFilter(monthFilter + 1);
          setCountMonths(countMonths + 1);
        }
      };

      const backDay = () => {
        downMonth(monthFilter - 1);
        setMonthNumber(monthFilter);
        setDayChosen(Month[monthFilter]);
      };

      const fowardDay = () => {
        upMonth(monthFilter + 1);
        setMonthNumber(monthFilter);
        setDayChosen(Month[monthFilter]);
      };

      useEffect(() => {
        setIsLoadingScreen(true);
        getHistory();
      }, [monthFilter, yearFilter,isFocused]);

    async function getHistory(){
        const userData = await getUserInfo();
        if(!userData){
            setIsLogged(false)
            setIsLoadingScreen(false);
            setIsLoading(false);
            return
        }
        api.get(`/historyDrinkUser?userId=${userData.id}&month=${monthFilter+1}&year=${yearFilter}`)
            .then(res =>{
                if(res.status == 200){
                    let amount = 0.00;
                    res.data.map((item) => {
                        amount += item.value
                    })
                    setIsLogged(true)
                    setDrinkHistory(res.data)
                    setAmount(amount)
                    setIsLoading(false);
                    setIsLoadingScreen(false);
                }
            })
    }

    return isLoading ?
        <BackgroundImage>
            <Loading/>
        </BackgroundImage>:
        <BackgroundImage>
            <View style={Style.container}>
                <View style={Style.date}>
                    <Pressable onPress={backDay}>
                        <Icon name="chevron-back-outline" size={20} color="#fff"/>
                    </Pressable>
                    <View>
                        <Text style={Style.textMonth}>
                            {Month[monthFilter]} - {yearFilter}
                        </Text>
                    </View>
                    <Pressable onPress={fowardDay}>
                        <Icon name="chevron-forward-outline" size={20} color="#fff"/>
                    </Pressable>
                </View>
                    <View style={Style.cardValue}>
                        <Text style={Style.textPriceTitle}>
                            Você economizou
                        </Text>
                        <Text style={Style.textPrice}>
                            <NumberFormat
                                value={amount}
                                displayType="text"
                                prefix="R$ "
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale={true}
                                renderText={(item) => (<Text>{item}</Text>)}
                            />
                        </Text>
                    </View>
            {isLoadingScreen ? <Loading /> : <>
                <View style={Style.textCard}>
                    <Text style={Style.textHistory}>
                        Histórico de consumo
                    </Text>
                </View>

                <SafeAreaView style={{width:'90%',marginBottom:hp('40%')}}>
                    <FlatList
                        style={{height:'100%'}}
                        data={drinkHistory}
                        renderItem={(item) => (<HistoryOption top {...props} item={item.item}/>)}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={()=><Text style={emptyList.text}>
                            {isLogged?'Nenhum registro encontrado!':'Faça Login para verificar seu histórico'}
                        </Text>}
                        refreshing={isLoadingScreen}
                        refreshControl={
                            <RefreshControl refreshing={isLoadingScreen} onRefresh={getHistory} />
                          }
                    />
                </SafeAreaView>
                </>}
            </View>
        </BackgroundImage>

}
export default History;
