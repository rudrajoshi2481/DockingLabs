import { GiteaServerURL } from "@/config";
import axios from "axios";

export const fetchAllRepoOfUser = async ({giteaUserName}:any) => {
  
  return await axios
    .get(`${GiteaServerURL}/users/${giteaUserName}/repos`)
    .then((res) => {
      
      return res;
    })
    .catch((err) => {
      
      return err;
    });
};
