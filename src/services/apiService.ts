import axiosInstance from "../utils/axiosInstance";
import * as Types from "../types/index";

export const loginUser = async (data: Types.LoginData): Promise<Types.LoginResponse> => {
  const response = await axiosInstance.post<Types.LoginResponse>("/api/auth/login", data);
  return response.data;
};

export const signupUser = async (data: Types.SignupData): Promise<Types.SignupResponse> => {
  const response = await axiosInstance.post<Types.SignupResponse>("/api/auth/signup", data);
  return response.data;
};
