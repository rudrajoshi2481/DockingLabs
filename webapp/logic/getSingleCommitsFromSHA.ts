// /repos/{owner}/{repo}/commits


import { GiteaServerURL } from "@/config";
import axios from "axios";

export const getSingleCommitsFromSHA = async ({
  giteaUserName,
  repoName,
  shaId
}: any) => {
  return await axios

  // sha=${shaId}&stat=false&verification=false&files=true
    .get(`${GiteaServerURL}/repos/${giteaUserName}/${repoName}/commits?sha=${shaId}&stat=false&verification=false&&page=1&files=false`)
    .then((res) => {
      
      return res;
    })
    .catch((err) => {
      return err;
    });
};
