import axios from "axios";

export const addAxiosHeadersAuthorizationToken = async ({
  token,
  status,
}: any) => {
  if (status) {
    return axios.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `token ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
