export interface UserApi {
  _authKey: string | undefined;
  _loggedIn: boolean;
  login(email: string): Promise<void>;
  logout(authKey: string): Promise<boolean>;
}

