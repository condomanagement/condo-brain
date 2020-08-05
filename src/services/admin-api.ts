export interface AdminApi {
  getUsers(): Promise<User[]>;
}

export interface User {
  name: string;
  unit: number;
  admin: boolean;
  email: string;
}
