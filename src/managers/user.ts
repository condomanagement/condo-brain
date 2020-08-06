import axios from 'axios';
import { UserApi } from '../services/user-api';

export class UserManager implements UserApi {
  public _loggedIn: boolean;

  public _authKey: string | undefined;

  constructor(authKey: string | undefined = undefined) {
    this._loggedIn = false;
    if (authKey) {
      this.validateAuthKey(authKey);
    } else {
      this._authKey = undefined;
    }
  }

  public async login(email: string): Promise<void> {
    const loginEmail = await axios.post('/api/authentication/login', { email }).then((result) => result.data);
    this._authKey = undefined;
    this._loggedIn = false;
    return loginEmail;
  }

  public async logout(authKey: string): Promise<boolean> {
    this._authKey = undefined;
    this._loggedIn = false;
    const logoutKey = await axios.post('/api/authentication/logout', { authKey }).then((result) => result.data);
    return logoutKey;
  }

  private async validateAuthKey(authKey: string): Promise<void> {
    const valid = await axios.post('/api/authentication/validateAuthKey', { authKey }).then((result) => result.data);
    if (valid.valid) {
      this._loggedIn = valid;
      this._authKey = valid.authKey;
    } else {
      this._authKey = undefined;
    }
  }
}
export default UserManager;
