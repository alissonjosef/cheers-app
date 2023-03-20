import api from "./api";
import { getUserInfo, updateUserInfo } from "./loginService";

export async function getSubscription(){
    await updateUserInfo()
    const userData = await getUserInfo()
    const now = new Date
    const subscriptionInformation = {
        ok: userData.subscription.end_at >= now.getUTCSeconds() && 
            (userData.subscription.status == 'active' 
            && userData.subscription.payment_status == 'paid' 
            && userData.subscription.has_disputed == 'N') ,
        end_date: convertDate(userData.subscription.end_at),
        status: getSubscriptionStatus(userData.subscription),
        invoice_pdf: userData.subscription.invoice_pdf,
        recurrency_status: userData.subscription.subscription_status == 'active'? "Ativa" : "Inativa",
        subscription_value: formatValue(userData.subscription),
        userData
    }
    return subscriptionInformation
}



function formatValue(sub){
    const { total } = sub
    return 'R$ '+( total / 100 ).toFixed(2).toString().replace('.',',')
}
function convertDate(epoch){
    const date = new Date(0)
    date.setUTCSeconds(epoch)

    const dateString = ('0' + date.getDate()).slice(-2) + '/'
                    + ('0' + (date.getMonth()+1)).slice(-2) + '/'
                    + date.getFullYear();
    return dateString
}

function getSubscriptionStatus(sub){
    if(sub.has_disputed == 'S')
        return "Disputada"
    if(sub.status == 'active' && sub.payment_status == 'paid')
        return "Ativa"
    return "Inativa"
}

export function cancelSubscription(sub){
    return api
        .post('/cancelSubscription',{user_id: sub.userData.id})
        .then(res =>{
            return res.end_at == 0
        }).catch(err =>{
            console.error("ERROR CANCEL SUBSCRIPTION ",err)
        })
}