import { AuthServerURL, GiteaServerURL } from "@/config";
import axios from "axios";

export const fetchUserDetailsFromGitea = async ({ giteaUserName }: any) => {
  return await axios
    .get(`${GiteaServerURL}/users/${giteaUserName}`)
    .then((res) => {
      
      return res;
    })
    .catch((err) => {
      
      return err;
    });
};
