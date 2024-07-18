import { AuthServerURL } from "@/config";
import axios from "axios";

export const userDetailsFromDB = async({email}:any) =>{ 
    return await axios
    .post(`${AuthServerURL}/login/getUser`, { email:email })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    });
}