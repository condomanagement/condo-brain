export interface UserApi {
    authKey: string | undefined;
    loggedIn: boolean;
    isAdmin: boolean;
    login(email: string): Promise<void>;
    logout(authKey: string): Promise<boolean>;
    processLogin(emailKey: string): Promise<boolean | string>;
    validateToken(token: string): Promise<boolean>;
    createReservation(formData: FormData): Promise<GenericResponse>;
    getQuestions(): Promise<Question[]>;
    getAmenities(): Promise<Amenity[]>;
}
export interface GenericResponse {
    success: boolean;
    error?: string;
}
export interface Question {
    id: number;
    question: string;
    requiredAnswer: boolean;
}
export interface Amenity {
    id: number;
    name: string;
}
//# sourceMappingURL=user-api.d.ts.map