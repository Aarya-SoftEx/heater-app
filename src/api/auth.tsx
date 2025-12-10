import axios from "axios";
 
export interface LoginPayload {
  email: string;
  password: string;
}
 
export interface ApiResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: object;
}
 
const BASE_URL =
  "https://overdecorative-noncosmically-lucile.ngrok-free.dev/api";
 
export const loginUser = async (
  payload: LoginPayload
): Promise<{ data: ApiResponse | null; status: number; ok: boolean }> => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
 
  let data: ApiResponse | null = null;
 
  try {
    data = await res.json();
  } catch (err) {
    console.error("Failed to parse login JSON:", err);
  }
 
  return {
    data,
    status: res.status,
    ok: res.ok,
  };
};
 
export interface SignupPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  // phone?: string;
}
 
export const signupUser = async (payload: SignupPayload) => {
  return axios.post(`${BASE_URL}/auth/signup`, payload, {
    headers: { "Content-Type": "application/json" },
  });
};
 
export const sendForgotPasswordOtp = (email: string) => {
  return axios.post(
    `${BASE_URL}/auth/forgotpassword`,
    { email },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
 
export const validateOtp = (email: string, otp: string) => {
  return axios.post(
    `${BASE_URL}/auth/validate-otp`,
    { email, otp },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
export const resetPassword = (
  email: string,
  password: string,
  confirmPassword: string
) => {
  return axios.post(
    `${BASE_URL}/auth/resetpassword`,
    { email, password, confirmPassword },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};