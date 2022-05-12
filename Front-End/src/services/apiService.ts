import _axios from "axios";
import router from "../router";
import { Notify } from "quasar";
export default class ApiService {
  static axios = _axios.create({
    baseURL: "http://172.16.21.60:5000/api/File",
    timeout: 1000000,
  });

  static axiosInterceptor = ApiService.addInterceptor();

  static addInterceptor(): void {
    ApiService.axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("access_token");
      if (config?.headers) {
        if (token) {
          config.headers.authorization = token;
        } else config.headers.authorization = "";
        return config;
      }
    });
  }

  static async get<T>(url: string): Promise<T> {
    try {
      const res = await ApiService.axios.get<T>(url);
      return res.data;
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  static async post<T>(url: string, body?: unknown, config?: any): Promise<T> {
    try {
      const res = await ApiService.axios.post<T>(url, body, config);
      return res.data;
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  static async put<T>(url: string, body?: unknown): Promise<T> {
    try {
      const res = await ApiService.axios.put<T>(url, body);
      return res.data;
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  static async delete<T>(url: string): Promise<T> {
    try {
      const res = await ApiService.axios.delete<T>(url);
      return res.data;
    } catch (error) {
      ApiService.handleError(error);
      return Promise.reject(error);
    }
  }

  private static handleError(error: any) {
    if (error.response) {
      if (error.response.status == 422) {
        let template = "<span>";
        const err = error.response.data.detail;
        if (err.length) {
          err.forEach((x: string, i: number) => {
            template += `<li> ${x} </li>
            ${i == err.length - 1 ? "" : "<br />"} `;
          });
        } else {
          template += "Please resolve some validation error(s)";
        }
        template += "</span>";

        Notify.create({
          html: true,
          message: template,
          timeout: 50000,
          color: "red-9",
          actions: [
            {
              label: "Dismiss",
              color: "white",
              class: "text-weight-bold",
            },
          ],
        });
      } else if (error.response.status == 401) {
        router.replace("/login");
        localStorage.clear();
        Notify.create({
          message: "UnAuthorized",
          timeout: 5000,
          color: "red-9",
        });
      } else if (error.response.status == 500) {
        Notify.create({
          message: error.response.data.detail,
          timeout: 5000,
          color: "red-9",
        });
      } else {
        Notify.create({
          message: error.response.data.detail,
          timeout: 5000,
          color: "red-9",
        });
      }
    } else {
      return error;
    }
  }
}
