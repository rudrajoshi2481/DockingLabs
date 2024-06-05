import { GiteaServerURL } from "@/config";
import axios from "axios";

export const FetchSpecificFile = async ({
  giteaUserName,
  repoName,
  filePath
}: any) => {
  return await axios
    .get(`${GiteaServerURL}/repos/${giteaUserName}/${repoName}/contents/${filePath}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};


// http://localhost:5003/api/v1/repos/ru/webssh202/contents/app%2Fclient%2Fsrc%2Fjs%2Findex.ts?token=32fbd8f6a1e7fe44a094024122de2506f61328ff