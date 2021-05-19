import ApiService from "../../services/apiService";
import { LoginFormData, RegistrationFormData } from "./form";
import { CurrentUser, HTTPCurentUserResponse } from "./types";

class AuthApiService extends ApiService {
  async login(formData: LoginFormData) {
    try {
      const { data } = await ApiService.fetcher.post<HTTPCurentUserResponse>(
        "/users/login",
        formData
      );
      return {
        user: this.transformUser(data),
        token: data.token,
      };
    } catch (error) {
      throw error.response.data;
    }
  }

  async loginByToken() {
    try {
      const { data } = await ApiService.fetcher.get<HTTPCurentUserResponse>(
        "/users/profile"
      );
      return this.transformUser(data);
    } catch (error) {
      throw error.response.data;
    }
  }

  async register(formData: Omit<RegistrationFormData, "passwordConfirmation">) {
    try {
      const { data } = await ApiService.fetcher.post<HTTPCurentUserResponse>(
        "/users",
        formData
      );
      return {
        user: this.transformUser(data),
        token: data.token,
      };
    } catch (error) {
      throw error.response.data;
    }
  }

  transformUser(userResponse: HTTPCurentUserResponse): CurrentUser {
    return {
      email: userResponse.email,
      id: userResponse._id,
      name: userResponse.name,
    };
  }
}

const authApi = new AuthApiService();

export default authApi;
