
import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,ScrollView, TextComponent} from 'react-native';
import { HelperText, Divider} from 'react-native-paper';

import {BackgroundImage} from '../../global/style';

import {TextTitle,TextDetail,HeaderSection,FaqArea} from './style';
import FaqCard  from '../../components/FaqCard/'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

function Faq() {

    return (

        <BackgroundImage >
            <HeaderSection>
                <Divider style={{backgroundColor:'#fff'}}/>
                <View style={{paddingTop:hp('5%')}}>
                    <TextTitle>FAQ</TextTitle>
                    <TextDetail>Para entender melhor o funcionamento {'\n'} da Cheers e tirar todas suas duvidas</TextDetail>
                </View>

            </HeaderSection>
            <FaqArea>
                <ScrollView>
                    <FaqCard
                        top={false}
                        title={'Como faço para retirar meu drink ?'}
                        content={'Se você ainda não é assinante, baixe o app Cheers, cadastre-se e assine um plano. Para assinantes, basta clicar na sua localização e escolher seu drink. Você terá que apresentar sua tela com o drink da sua escolha para o garçom que apertará em « VALIDAR » para liberar a sua bebida.'}
                    />
                    <FaqCard
                        top
                        title={'Posso cumular meus drinks ?'}
                        content={'Não pode, você terá direito a um só drink por dia e isso todos os dias. Se por exemplo você ficar 3 dias sem consumir, não poderá resgatar os 3 de uma vez só.'}
                    />
                    <FaqCard
                       top
                        title={'Caso eu peça meu drink as 23:50, consigo pedir outro 00:01 ?'}
                        content={'Não, seu drink será renovado todos os dias as 5:00 da manhã.'}
                    />
                    <FaqCard
                        top
                        title={'Validando meu drink no App sem estar presente no bar, ainda posso retirá-lo ?'}
                        content={'Não, é necessário que seja um funcionário do estabelecimento valide seu pedido na sua tela para que o seu drink seja aceito, preparado e servido.'}
                    />
                    <FaqCard
                       top
                        title={'Quanto tempo depois de fazer a minha assinatura eu posso degustar meu primeiro drink ?'}
                        content={'Logo após criar sua conta e fazer sua assinatura, você poderá imediatamente fazer seu primeiro pedido com a vantagem Cheers na localização da sua escolha.'}
                    />
                    <FaqCard
                        top
                        title={'Uma assinatura é valida para a mesa inteirsa ?'}
                        content={'Não, uma assinatura é válida somente para um assinante. Se todos tiverem uma assinatura válida, todos receberão um drink. Caso alguém não tenha, sugerimos que assine e aproveite os benefícios Cheers para não ficar de fora.'}
                    />
                    <FaqCard
                       top
                        title={'O meu plano tem alguma fidelidade ?'}
                        content={'Não há fidelidade com os planos semanais e mensais da Cheers. Você pode aproveitar o benefício até quando quiser. Caso você escolha cancelar a sua assinatura, é só entrar em contato conosco e faremos o necessário.'}
                        
                    />
                    <FaqCard
                       top
                        title={'Se o plano Cheers mudar de valor o que acontece ?'}
                        content={'A sua assinatura semanal ou mensal não sofrerá alterações ou reajustes no valor inicial, isso enquanto ela estiver válida.'}
                        
                    />
                    <FaqCard
                       top
                        title={'Qualquer restaurante pode fazer parte do catalogo da Cheers ?'}
                        content={'Todos nossos parceiros são escolhidos a dedo para fazer parte de nosso catalogo. Selecionamos os melhores endereços da cidade para que nossos assinantes tenham uma experiencia de qualidade. Se tiver interesse de aumentar sua visibilidade e se tornar parceiro Cheers, é só entrar em contato conosco pela a aba « Parceiro » e selecionar « Me tornar parceiro Cheers ».'}
                        
                    />
                    <FaqCard
                       top
                        title={'Posso escolher uma localização, beber meu drink e ir embora ?'}
                        content={'Pode sim, a ideia do app Cheers é te oferecer a chance de degustar drinks e conhecer novos lugares.'}
                    />

                </ScrollView>
            </FaqArea>


        </BackgroundImage>


    )


}



export default Faq;
