import { UserApi } from '../services/user-api';
export declare class UserManager implements UserApi {
    loggedIn: boolean;
    isAdmin: boolean;
    authKey: string | undefined;
    constructor();
    login(email: string): Promise<void>;
    logout(authKey: string): Promise<boolean>;
    processLogin(emailKey: string): Promise<boolean | string>;
    validateToken(token: string): Promise<boolean>;
    private validateAuthKey;
}
export default UserManager;
//# sourceMappingURL=user.d.ts.map