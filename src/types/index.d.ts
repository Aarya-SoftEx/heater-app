export interface AuthState {
  isAuthenticated: boolean;
}


export interface TokenPayload {
  email: string;
  exp: number;         
  iat: number;         
  isSuperAdmin: boolean;
}


export interface LoginData {
  email: string;
  password: string;
}


export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
  defaultWorkspace: DefaultWorkspace;
  workspaces: Workspace[];
}


export interface SignupData {
  workspace_name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user: User
}