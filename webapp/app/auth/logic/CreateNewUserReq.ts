import { AuthServerURL } from "@/config"
import axios from "axios"

export const CreateNewUserReq = async({userName,password,email}:any) => {
    return await axios.post(`${AuthServerURL}/createUser`,{userName,password,email}).then(res => {
        return res
    }).catch(err => {
        return err
    })
} 