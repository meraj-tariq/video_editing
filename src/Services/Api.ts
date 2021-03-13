import axios from "axios";

import CustomHttpError from "../Types/CustomHttpError";
import { hideLoadingBar, showLoadingBar } from "../Utils/LoadingBar";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const api = axios.create({
  // withCredentials: environment.environment !== 'local',
});

api.interceptors.request.use(
  (config) => {
    showLoadingBar();
    return {
      ...config,
      headers: {
        ...config.headers,
      },
    };
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    hideLoadingBar();
    return response.data;
  },
  (err) => {
    hideLoadingBar();
    if (!err.response) {
      return Promise.reject(
        new CustomHttpError(
          "Error occurred while sending the request, please check your internet settings",
          {
            statusCode: 0,
            responseText:
              "Error occurred while sending the request, please check your internet settings",
          }
        )
      );
    }
    // Listen for status code unauthorized, and then trigger logout.
    if (err.response.status === 401) {
      // eslint-disable-next-line import/no-cycle
      cookies.remove("AUTH_TOKEN");
      localStorage.clear();
      document.location.href = "/";
      window.location.reload();
      return Promise.reject(
        new CustomHttpError("User session has expired!", {
          statusCode: err.response.status,
          responseText: err.response.data.responseText,
        })
      );
    }
    // Listen for status code unauthorized, and then trigger logout.
    if (err.response.status === 400) {
      // eslint-disable-next-line import/no-cycle
      return Promise.reject(
        new CustomHttpError(err.response.data.message, {
          statusCode: err.response.status,
          responseText: err.response.data.message,
        })
      );
    }
    if (err.response.status === 403) {
      return Promise.reject(
        new CustomHttpError(
          "You do not have permission to perform this operation",
          {
            statusCode: err.response.status,
            responseText:
              "You do not have permission to perform this operation",
          }
        )
      );
    }
    if (err.response?.data?.responseText) {
      return Promise.reject(
        new CustomHttpError(err.response.data.responseText, {
          statusCode: err.response.status,
          responseText: err.response.data.responseText,
          payload: err.response.data.payload,
          responseCode: err.response.data.responseCode,
        })
      );
    }

    return Promise.reject(
      new CustomHttpError(
        "Oops, something went wrong! We are not quite sure what it is",
        {
          statusCode: err.response.status,
          responseText:
            "Oops, something went wrong! We are not quite sure what it is",
        }
      )
    );
  }
);

const Api = {
  Post<T, R>(path: string, body: T) {
    return api.post<R>(`${path}`, body);
  },

  Put<T, R>(path: string, body: T) {
    return api.put<R>(`${path}`, body);
  },

  Patch<T, R>(path: string, body: T) {
    return api.patch<R>(`${path}`, body);
  },

  Get<R>(path: string) {
    return api.get<R>(`${path}`);
  },

  Delete<R>(path: string) {
    return api.delete<R>(`${path}`);
  },
};
export default Api;
