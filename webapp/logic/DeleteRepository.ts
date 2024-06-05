import { GiteaServerURL } from "@/config";
import axios from "axios";

export const deleteReposititory = async ({giteaUserName,repoName}:any) => {
  
  return await axios
    .delete(`${GiteaServerURL}/repos/${giteaUserName}/${repoName}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      
      return err;
    });
};
