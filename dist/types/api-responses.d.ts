import { UserType } from "../services/admin-api";
export interface LoginResponse {
    error?: string;
    success?: boolean;
}
export interface LogoutResponse {
    success: boolean;
}
export interface ProcessLoginResponse {
    success: boolean;
    token?: string;
}
export interface UserData {
    name: string;
    email: string;
    admin: boolean;
    parkingAdmin: boolean;
    vaccinated: boolean;
    unit: number;
    phone: string;
    type: UserType;
}
export interface ValidateTokenResponse {
    success: boolean;
    user: UserData;
}
export interface GenericApiResponse {
    success?: boolean;
    error?: string;
    message?: string;
}
//# sourceMappingURL=api-responses.d.ts.map