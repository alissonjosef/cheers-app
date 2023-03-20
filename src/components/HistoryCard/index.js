import React from 'react';
import {Text, View} from 'react-native'
import {Divider} from 'react-native-paper';
import Moment from 'moment';
import NumberFormat from 'react-number-format';

import {OptionCard} from './style.js'


const HistoryOption = ({top = false, title = '', item = []})  =>  {
    Moment.updateLocale('pt', {
        weekdays: ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado'],
        months : ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    });

    return (
        <>
            {top && (<Divider style={{backgroundColor:'#F4F4F2'}}/>)}
            <OptionCard>
                <OptionCard.card flexSize={2}>
                    <View>
                        <OptionCard.text color={'#40E0D0'} size={'15px'}>
                            {item.nomeDrink}
                        </OptionCard.text>
                        <OptionCard.text size={'9px'}>
                            {Moment(item.date_solicitation).format('LLLL')}
                        </OptionCard.text>
                    </View>
                </OptionCard.card>
                <OptionCard.card>
                    <View>
                        <OptionCard.text color={'#40E0D0'} size={'15px'}>
                            <NumberFormat
                                value={item.value}
                                displayType="text"
                                prefix="R$ "
                                decimalSeparator=","
                                decimalScale={2}
                                fixedDecimalScale={true}
                                renderText={(item) => (<Text>{item}</Text>)}
                            />
                        </OptionCard.text>
                    </View>
                </OptionCard.card>
            </OptionCard>
            <Divider style={{backgroundColor:'#F4F4F2'}}/>
        </>
    )
}

export default HistoryOption;
