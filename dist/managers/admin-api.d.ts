import { AdminApi, User } from '../services/admin-api';
export declare class AdminManager implements AdminApi {
    private _isAdmin;
    constructor();
    getUsers(): Promise<User[]>;
    upload(formData: FormData): Promise<boolean>;
}
export default AdminManager;
//# sourceMappingURL=admin-api.d.ts.map