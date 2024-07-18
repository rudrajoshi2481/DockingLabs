import { GiteaServerURL } from "@/config";
import axios from "axios";

export const fetchAllUserOrganization = async () => {
  return await axios
    .get(`${GiteaServerURL}/orgs`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
