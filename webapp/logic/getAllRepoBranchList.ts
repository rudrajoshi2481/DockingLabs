

import { GiteaServerURL } from "@/config";
import axios from "axios";

export const getAllRepoBranchList = async({giteaUserName,repoName}:any) => {
    return await axios
    .get(`${GiteaServerURL}/repos/${giteaUserName}/${repoName}/branches`)
    .then((res) => {
      
      return res;
    })
    .catch((err) => {
      
      return err;
    });
}