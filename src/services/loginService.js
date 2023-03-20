import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "./api"

export async function getUserInfo(){
    return JSON.parse(await AsyncStorage.getItem("userData"))
}

export async function getUserFavs(){
    await updateUserInfo()
    return JSON.parse(await AsyncStorage.getItem("userFavs"))
}

export async function updateUserInfo(){
    const userData = await getUserInfo()

    return api.get('/users/'+userData.id)
        .then(res =>{
            if(res.data.success){
                setUserInfo(res.data.result)
                api.get('/allFavs/'+userData.id)
                    .then(res => {
                        if(res.data.success)
                            setUserFavs(res.data.results)
                    })
            }
        })

}

export async function setUserInfo(userData){
    if(userData == null)
        return updateUserInfo()
    return AsyncStorage.setItem('userData',JSON.stringify(userData))
}

export async function setUserFavs(favs){
    if(favs == null)
        return updateUserInfo()
    return AsyncStorage.setItem('userFavs',JSON.stringify(favs))
}

export async function LogoutUser(){
    const tempData = await AsyncStorage.getItem("userData")
      if(tempData != null){
        AsyncStorage.removeItem('userData')
        return true
    }
    return false
}