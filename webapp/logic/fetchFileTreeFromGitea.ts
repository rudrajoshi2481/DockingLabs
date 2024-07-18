
import { GiteaServerURL } from "@/config";
import axios from "axios";

export const fetchFileTreeFromGitea = async ({giteaUserName,repoName,shaId}:any) => {
  return await axios
    .get(`${GiteaServerURL}/repos/${giteaUserName}/${repoName}/git/trees/${shaId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

