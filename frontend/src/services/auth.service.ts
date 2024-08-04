import {
  IAdmin,
  IAuthForm,
  IAuthResponse,
  ICategory,
  IUser,
} from "@/types/auth.types";

import { axiosClassic, axiosWithAuth } from "@/api/interceptors";

import { removeFromStorage, saveTokenStorage } from "./auth-token.service";

export const authService = {
  async main(type: "login" | "register", data: IAuthForm) {
    const response = await axiosClassic.post<IAuthResponse>(
      `/admin/${type}`,
      data
    );

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);

    return response;
  },

  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>(
      "/admin/login/access-token"
    );

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);

    return response;
  },

  async logout() {
    const response = await axiosClassic.post<boolean>("/admin/logout");

    if (response.data) removeFromStorage();

    return response;
  },

  async getAllAdmin() {
    const response = await axiosWithAuth.get<IAdmin[]>("/admin/all");
    return response;
  },

  async getCategory() {
    const response = await axiosWithAuth.get<ICategory[]>("/category/");
    return response;
  },
};
