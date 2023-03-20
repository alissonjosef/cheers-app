import AsyncStorage from "@react-native-async-storage/async-storage"; 


export async function isUserFristTimeInApp(){
    try {
        const fristTime = JSON.parse(await AsyncStorage.getItem("termsPages")); 

        if (fristTime?.userInApp) {
            return true
        }
        return false; 
    } catch (e) {
        return false 
    }
}
export async function setUserFristTimeInApp(data){
    if(data == null) {
        throw('data não pode ser null')
    }
        
    return AsyncStorage.setItem('termsPages',JSON.stringify(data))
}
