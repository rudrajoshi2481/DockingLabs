import { GiteaServerURL } from "@/config";
import axios from "axios";


export const createNewRepository = async ({name,description,visiblity}:any) => {
  return await axios
    .post(`${GiteaServerURL}/user/repos`,{
      "auto_init": true,
      "default_branch": "main",
      "description": description,
      "name": name,
      "private": visiblity ,
      "template": false,
      "trust_model": "default"
    })
    .then((res) => {
      
      return res;
    })
    .catch((err) => {
      
      return err;
    });
};
