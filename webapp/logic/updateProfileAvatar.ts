import { GiteaServerURL } from "@/config";
import axios from "axios";

export const updateProfileAvatar = async({image}:any) => {
    return await axios
    .post(`${GiteaServerURL}/user/avatar`,{image:image},{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
    .then((res) => {
      
      return res;
    })
    .catch((err) => {
      
      return err;
    });
}