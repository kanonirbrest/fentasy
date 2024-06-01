import axios from "axios";

import { AXIOS_TIMEOUT } from "@/api/constant.js";
import { authClient } from "@/lib/auth/client.js";
import { login } from "@/molules/auth/api.js";
import { getToken, TOKEN_TYPE } from "@/utils/auth.js";
// import { _useAuth } from "@/modules/Auth/stores/auth-store.js";
// import { useSnackBar } from "@/modules/SnackBar/store/index.js";
// import { getToken, TOKEN_TYPE } from "@/utils/auth.js";
// import { ERROR_CODES, RESPONSE_STATUSES } from "@/utils/constant.js";
// import { ROUTES } from "@/utils/routes.js";

const axiosInstance = axios.create({
  baseURL: "https://mafia-fantasy-dev-5ca0d27a9bff.herokuapp.com/api",
  timeout: AXIOS_TIMEOUT,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.authorization !== false) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `${TOKEN_TYPE.BEARER} ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      await authClient.signOut();
    }

    return Promise.reject(error);
  },
);

class HTTP {
  constructor(instance) {
    this.instance = instance;
  }

  get(url, params) {
    return this.instance.get(url, params);
  }
  delete(url, params) {
    return this.instance.delete(url, params);
  }
  post = async (url, body, config) => {
    return this.instance.post(url, body, config);
  };
  put(url, body, config) {
    return this.instance.put(url, body, config);
  }
  patch(url, body, config) {
    return this.instance.patch(url, body, config);
  }
}

const httpService = new HTTP(axiosInstance);

export default httpService;
