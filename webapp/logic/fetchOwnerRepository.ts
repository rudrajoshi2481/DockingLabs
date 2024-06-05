

import { AuthServerURL, GiteaServerURL } from "@/config";
import axios from "axios";

export const fetchOwnerRepository = async ({ giteaUserName,repoName }: any) => {
  return await axios
    .get(`${GiteaServerURL}/repos/${giteaUserName}/${repoName}`)
    .then((res) => {
      
      return res;
    })
    .catch((err) => {
      
      return err;
    });
};
