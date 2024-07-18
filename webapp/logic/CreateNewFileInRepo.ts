import { GiteaServerURL } from "@/config";
import axios from "axios";

export const createNewFileInRepo = async ({
  userName,
  repoName,
  filePath,
  fileName,
  extension,
  authorMail,
  branch,
  message,
}: any) => {
  return await axios
    .post(
      `${GiteaServerURL}/repos/${userName}/${repoName}/contents/${filePath}/${fileName}${extension}`,
      {
        author: {
          email: authorMail,
          name: userName,
        },
        branch: branch,
        committer: {
          email: authorMail,
          name: userName,
        },
        content: null,
        dates: {
          author: new Date().toISOString(),
          committer: new Date().toISOString(),
        },
        message: message,
        new_branch: branch,
        signoff: false,
      }
    )
    .then((res) => {
      console.log(res.data)
      return res;
    })
    .catch((err) => {
      return err;
    });
};
