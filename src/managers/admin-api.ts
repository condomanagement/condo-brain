import axios from 'axios';
import { AdminApi, User } from '../services/admin-api';

export class AdminManager implements AdminApi {
  private _isAdmin: boolean;

  constructor() {
    this._isAdmin = true;
  }

  public async getUsers(): Promise<User[]> {
    if (!this._isAdmin) {
      return [];
    }
    const users: User[] = await axios.get('/api/users').then((result) => result.data);
    return users;
  }
}
export default AdminManager;
