export interface AdminApi {
    getUsers(): Promise<User[]>;
    upload(formData: FormData): Promise<boolean>;
}
export interface User {
    name: string;
    unit: number;
    admin: boolean;
    email: string;
}
//# sourceMappingURL=admin-api.d.ts.map