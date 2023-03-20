import React from 'react';
import { Pressable, View } from 'react-native';
import { Badge, Card } from 'react-native-paper';
import { CardTitle } from './style';
import { BASE_URL } from '../../Util/constants'
import Drink from '../../assets/img/drink.jpg';

const CardBar = ({ item, actualId, onClick, drinkSelect, scrollTo, index, close }) => {

    const showIntegration = () => {
        onClick(true);
        drinkSelect(item);
        scrollTo(index)
    }

    return (
        <Pressable
            onPress={item.id > 0 ? showIntegration : () => { }}
            style={{
                width: item.id > 0 ? 150 : 100,
                height: '70%',
                margin: 5,
                borderRadius: 40,
                opacity: item.id > 0 ? 100 : 0
            }}>
            <Card style={{ height: '50%', backgroundColor: `rgba(0,0,0,0)` }} >
                {item.imagemDrink && <Card.Cover style={{ opacity: actualId == item.id ? 1 : 0.7 }} source={item.imagemDrink ? { uri: BASE_URL + item.imagemDrink } : ''} />}
                {/* <View style={{ position: 'absolute', margin: 5 }}>
                    {close ? (
                        <Badge style={{ backgroundColor: `gray` }} >Horário Indisponivel</Badge>
                    ) :
                        <Badge style={{ backgroundColor: `green` }} >Disponível</Badge>
                    }
                </View> */}
                <CardTitle style={{ color: '#fff' }}>{item?.nomeDrink}</CardTitle>
            </Card>
        </Pressable>
    )
};

export default CardBar;