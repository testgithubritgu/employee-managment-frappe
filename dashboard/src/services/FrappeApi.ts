import axios from "axios";

const API_BASE =
  typeof window !== "undefined" && window.location?.origin
    ? window.location.origin
    : import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";

declare global {
  interface Window {
    csrf_token: string;
  }
}

const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // ✅ Safe check for csrf_token
    "X-Frappe-CSRF-Token":
      typeof window !== "undefined" && window.csrf_token
        ? window.csrf_token
        : "",
  },
});

apiClient.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined" && window.csrf_token) {
    config.headers["X-Frappe-CSRF-Token"] = window.csrf_token;
  } else {
    const csrf_token = await FrappeAPI.get_csrf_token();
    if (!!csrf_token) {
      config.headers["X-Frappe-CSRF-Token"] = csrf_token;
    }
  }
  return config;
});

export const FrappeAPI = {
  request: async <T = any>(
    method: "get" | "post" | "put" | "delete" | "patch",
    url: string,
    data?: any,
    config?: any,
  ): Promise<T> => {
    const response = await apiClient({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  },

  getDocument: async (
    doctype: string,
    name: string,
    fields?: string[],
  ): Promise<unknown> => {
    const response = await apiClient.get(`/api/resource/${doctype}/${name}`, {
      data: {
        fields: JSON.stringify(fields),
      },
    });

    return response.data;
  },

  get_csrf_token: async (): Promise<unknown> => {
    const res = await apiClient.get(
      `/api/method/ns_custom.api.get_csrf_token.get_csrf_token`,
    );
    return res?.data?.message;
  },
};
