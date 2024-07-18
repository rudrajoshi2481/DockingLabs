import { GiteaServerURL } from "@/config";
import axios from "axios";

export const FetchAllTheContentsFromRepoByPath = async ({
  giteaUserName,
  repoName,
  shaId,
  path = ""
}: any) => {



  return await axios
    .get(`${GiteaServerURL}/repos/${giteaUserName}/${repoName}/contents/${path}?ref=${shaId}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
