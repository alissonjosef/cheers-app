

const Plans = {
    Semanal:{
        name: 'Plano Semanal ',
        price: 'R$ 19,90',
        url:'https://buy.stripe.com/eVa5l4aek0Sb0kE002',
        offers:{
            one:'Um drink por dia durante 7 dias em qualquer bar e restaurante parceiro; ',
            two:'Sem limitação de horário; ',
            three:'Te oferecemos 7 drinks na sua semana, com uma assinatura no precinho de 1.'
        }
    
    },
    Mensal:{
        name: 'Plano Mensal ',
        price: 'R$ 39,90',
        url:'https://buy.stripe.com/aEU28SeuA8kDc3m145',
        offers:{
            one:'Um drink por dia durante 7 dias em qualquer bar e restaurante parceiro; ',
            two:'Sem limitação de horário; ',
            three:'Pagando 1,33 por dia você terá um mês inteiro para degustar drinks e conhecer novos lugares. '
        }
    },
    Anual:{
        name: 'Plano Anual ',
        price: 'R$ 298,90',
        url:'https://buy.stripe.com/28oeVEeuAgR94AUdQQ',
        offers:{
            one:'Tendo 40% de desconto na sua assinatura;',
            two:'Podendo pagar em até 12x;',
            three:'Pagando somente 24,90 por mês com o direito de degustar todo dia um drink durante o ano todo. '
        }
    }
}

export default Plans; 
