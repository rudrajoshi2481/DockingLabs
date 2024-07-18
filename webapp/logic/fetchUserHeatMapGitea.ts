import { GiteaServerURL } from "@/config";
import axios from "axios";

export const fetchUserHeatMapGitea = async({giteaId}:any) => {
    return await axios
    .get(`${GiteaServerURL}/users/${giteaId}/heatmap`)
    .then((res) => {
      
      return res;
    })
    .catch((err) => {
      
      return err;
    });
}