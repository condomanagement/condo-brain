export interface UserApi {
  authKey: string | undefined;
  loggedIn: boolean;
  isAdmin: boolean;
  login(email: string): Promise<void>;
  logout(authKey: string): Promise<boolean>;
  processLogin(emailKey: string): Promise<boolean | string>;
  validateToken(token: string): Promise<boolean>;
}

